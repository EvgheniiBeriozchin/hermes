if (!browser.menus || !browser.menus.getTargetElement) {
  let menuTarget = null
  let cleanupIfNeeded = () => {
    if (menuTarget && !document.contains(menuTarget)) menuTarget = null
  }
  document.addEventListener(
    "contextmenu",
    (event) => {
      menuTarget = event.target
    },
    true
  )
  document.addEventListener("visibilitychange", cleanupIfNeeded, true)
  browser.menus = browser.menus || {}
  browser.menus.getTargetElement = () => {
    cleanupIfNeeded()
    return menuTarget
  }
  true // Used by popup.js, as variable didUsePolyfill.
}
