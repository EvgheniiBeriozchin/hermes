/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
async function assertIsCurrentTab(tabId) {
  let [currentTab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })
  if (currentTab.id !== tabId) {
    throw new Error("The given tab ID is not the currently active tab")
  }
}

function renderElementDescriptions(port, descriptions) {
  let outputStatus = document.getElementById("outputStatus")
  if (!descriptions.length) {
    outputStatus.textContent =
      "Cannot find the target element. Please re-open the menu to try again."
    return
  }
  let list = document.createElement("ul")
  descriptions.forEach((description, elementIndex) => {
    let item = document.createElement("li")
    item.textContent = description
    item.tabIndex = 1
    item.onclick = () => {
      port.postMessage({
        action: "removeElement",
        elementIndex: elementIndex,
      })
    }
    item.onmouseenter = () => {
      port.postMessage({
        action: "highlightElement",
        elementIndex: elementIndex,
      })
    }
    list.appendChild(item)
  })
  outputStatus.textContent =
    "Click on any item to remove the element and its descendants:"
  outputStatus.appendChild(list)
}

function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "Frog":
          return browser.runtime.getURL("icons/logo48.png")
        case "Snake":
          return browser.runtime.getURL("icons/logo96.png")
        case "Turtle":
          return browser.runtime.getURL("icons/logo48.png")
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function beastify(tabs) {
      const css = `.hermes-red { color: red; }`
      console.log("Will insert css", css)
      browser.tabs
        .insertCSS({ code: css })
        .then(
          browser.tabs.sendMessage(tabs[0].id, {
            command: "activate",
          })
        )
        .catch(reportError)
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "deactivate",
      })
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not beastify: ${error}`)
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("beast")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(beastify)
        .catch(reportError)
    } else if (e.target.classList.contains("reset")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError)
    }
  })
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden")
  document.querySelector("#error-content").classList.remove("hidden")
  console.error(`Failed to execute beastify content script: ${error.message}`)
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/beastify.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError)(async () => {
  const popupParameters = await browser.runtime.sendMessage(
    "getPopupParameters"
  )
  let { tabId, frameId, targetElementId } = popupParameters

  // Ensure that the popup is opened for the currently active tab,
  // to prevent users from interacting with hidden tabs.
  await assertIsCurrentTab(tabId)

  // The browser.menus.getTargetElement API is only available in Firefox 63+.
  if (!browser.menus.getTargetElement) {
    let [didUsePolyfill] = await browser.tabs.executeScript(tabId, {
      runAt: "document_start",
      frameId,
      file: "menusGetTargetElementPolyfill.js",
    })
    if (didUsePolyfill === true) {
      console.log(
        "Registered a polyfill for browser.menus.getTargetElement - re-open the menu to see it in action."
      )
      let outputStatus = document.getElementById("outputStatus")
      outputStatus.textContent = `
        This extension requires the browser.menus.getTargetElement API,
        which is only available as of Firefox 63.
        To see the expected behavior, please re-open the menu.
      `
      return
    }
  }

  // Inject script in page (requires activeTab permission).
  await browser.tabs.executeScript(tabId, {
    runAt: "document_start",
    frameId,
    file: "beastify.js",
  })

  let port = browser.tabs.connect(tabId, {
    name: "portFromPopup",
    frameId,
  })
  port.onMessage.addListener((msg) => {
    if (msg.action === "elementDescriptions") {
      renderElementDescriptions(port, msg.descriptions)
    }
  })
  port.onDisconnect.addListener(() => {
    let outputStatus = document.getElementById("outputStatus")
    outputStatus.textContent = `The port to the page was closed.${
      port.error ? "Reason: " + port.error.message : ""
    }`
  })
  port.postMessage({
    action: "getElementDescriptions",
    targetElementId,
  })
})()
