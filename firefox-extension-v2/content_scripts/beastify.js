;(function () {
  if (window.hasRunContentScriptOnce === true) return
  window.hasRunContentScriptOnce = true

  browser.runtime.onConnect.addListener((port) => {
    if (port.name !== "portFromPopup") return
    let targetElements

    port.onMessage.addListener((msg) => {
      if (msg.action === "getElementDescriptions") {
        let elem = browser.menus.getTargetElement(msg.targetElementId)
        setTargetElement(elem)
      } else if (msg.action === "highlightElement") {
        let element = targetElements[msg.elementIndex]
        if (element) highlightElement(element)
        else removeHighlights()
      } else if (msg.action === "removeElement") {
        let element = targetElements[msg.elementIndex]
        if (element) {
          // When an element is removed, all of its descendants are removed too.
          // Update the UI, to show all nodes starting from the parent element.
          let parentElement = element.parentElement
          element.remove()
          setTargetElement(parentElement)
        }
      }
    })
    port.onDisconnect.addListener(() => {
      // Clean up when the port is disconnected (e.g. popup was closed).
      removeHighlights()
    })

    function setTargetElement(elem) {
      targetElements = []
      while (elem) {
        targetElements.unshift(elem)
        elem = elem.parentElement
      }

      // Reply with some description of the elements, so that the available
      // elements can be shown in the popup's UI.
      let descriptions = targetElements.map((elem) => {
        // For example, take the first 100 characters of the HTML element.
        return elem.cloneNode().outerHTML.slice(0, 100)
      })
      port.postMessage({
        action: "elementDescriptions",
        descriptions,
      })
    }
  })

  let highlightedBox
  function highlightElement(element) {
    removeHighlights()
    let boundingRect = element.getBoundingClientRect()
    highlightedBox = document.createElement("div")
    highlightedBox.style.outline = "2px dotted red"
    highlightedBox.style.margin = "0"
    highlightedBox.style.border = "0"
    highlightedBox.style.padding = "0"
    highlightedBox.style.backgroundColor = "rgba(100, 0, 0, 0.3)"
    highlightedBox.style.pointerEvents = "none"
    highlightedBox.style.zIndex = "2147483647"
    highlightedBox.style.position = "fixed"
    highlightedBox.style.top = boundingRect.top + "px"
    highlightedBox.style.left = boundingRect.left + "px"
    highlightedBox.style.width = boundingRect.width + "px"
    highlightedBox.style.height = boundingRect.height + "px"
    ;(document.body || document.documentElement).appendChild(highlightedBox)
  }

  function removeHighlights() {
    if (highlightedBox) {
      highlightedBox.remove()
      highlightedBox = null
    }
  }
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return
  }
  window.hasRun = true

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBeast(beastURL) {
    removeExistingBeasts()
    let beastImage = document.createElement("img")
    beastImage.setAttribute("src", beastURL)
    beastImage.style.height = "100vh"
    beastImage.className = "beastify-image"
    document.body.appendChild(beastImage)
  }

  let dictionary = new Map()
  dictionary.set("cat", "🐱")
  dictionary.set(
    "Our brains evolved in natural landscapes, and our perceptual systems are particularly well suited to wild outdoor spaces.",
    "🎉"
  )
  dictionary.set("cheeseburger", "🍔")

  let tempArray = Array.from(dictionary)
  tempArray.sort((pair1, pair2) => {
    // Each pair is an array with two entries: a word, and its emoji.
    // Ex: ['woman', '👩']
    const firstWord = pair1[0]
    const secondWord = pair2[0]

    if (firstWord.length > secondWord.length) {
      // The first word should come before the second word.
      return -1
    }
    if (secondWord.length > firstWord.length) {
      // The second word should come before the first word.
      return 1
    }

    // The words have the same length, it doesn't matter which comes first.
    return 0
  })

  let sortedEmojiMap = new Map(tempArray)

  const emojiMap = sortedEmojiMap
  let cats = 20

  let regexs = new Map()
  for (let word of emojiMap.keys()) {
    // We want a global, case-insensitive replacement.
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    regexs.set(word, new RegExp(word, "gi"))
  }

  function replaceByEmoji(node) {
    // Setting textContent on a node removes all of its children and replaces
    // them with a single text node. Since we don't want to alter the DOM aside
    // from substituting text, we only substitute on single text nodes.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    //console.log(node.childNodes)
    if (node.nodeType === Node.TEXT_NODE) {
      // This node only contains text.
      // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType.

      // Skip textarea nodes due to the potential for accidental submission
      // of substituted emoji where none was intended.
      if (node.parentNode && node.parentNode.nodeName === "TEXTAREA") {
        return
      }
      // Because DOM manipulation is slow, we don't want to keep setting
      // textContent after every replacement. Instead, manipulate a copy of
      // this string outside of the DOM and then perform the manipulation
      // once, at the end.
      let content = node.textContent
      // Replace every occurrence of 'word' in 'content' with its emoji.
      // Use the emojiMap for replacements.
      //for (let [word, emoji] of emojiMap) {
      // Grab the search regex for this word.
      const word =
        "Our brains evolved in natural landscapes, and our perceptual systems are particularly well suited to wild outdoor spaces."
      const regex = regexs.get(word)
      const startIndex = content.search(regex)
      //console.log("startIndex: ", startIndex)
      // Actually do the replacement / substitution.
      // Note: if 'word' does not appear in 'content', nothing happens.
      if (startIndex > -1 && cats > 0) {
        //node.parentNode.className += " hermes-red"
        console.log("In if")
        const text1 = document.createTextNode(content.slice(0, startIndex))
        console.log("In if2")
        const text2 = document.createElement("div")
        console.log("In if3")
        text2.className = "hermes-red"
        console.log("In if4")
        text2.appendChild(document.createTextNode(word))
        console.log("In i5")
        const text3 = document.createTextNode(
          content.slice(startIndex + word.length)
        )
        console.log("In if6")
        node.parentNode.insertBefore(text3, node)
        console.log("In if7")
        node.parentNode.insertBefore(text2, text3)
        console.log("In if8")
        node.parentNode.insertBefore(text1, text2)
        console.log("In if9")
        node.parentNode.removeChild(node)
        console.log("In if10")
        cats -= 1
      }

      // Now that all the replacements are done, perform the DOM manipulation.
    } else {
      if (cats > 0) {
        // This node contains more than just text, call replaceText() on each
        // of its children.
        for (let i = 0; i < node.childNodes.length; i++) {
          replaceByEmoji(node.childNodes[i])
        }
      }
    }
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image")
    for (let beast of existingBeasts) {
      beast.remove()
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "activate") {
      console.log("In activate")
      replaceByEmoji(document.body)
    } else if (message.command === "deactivate") {
      removeExistingBeasts()
    }
  })
})()
