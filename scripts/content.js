function matchesPattern(pattern, repoInfo) {
  const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$")
  return regex.test(repoInfo)
}

chrome.storage.sync.get("repoPatterns", (data) => {
  const patterns = (data.repoPatterns || "").split(/;|\n/).map(pattern => pattern.trim()).filter(pattern => pattern)
  let includeRepo = false

  if (!patterns.length) {
    includeRepo = true
  } else {
    const pathSegments = window.location.pathname.split("/")
    const repoInfo = pathSegments.length > 2 ? `${pathSegments[1]}/${pathSegments[2]}` : ""

    patterns.forEach(pattern => {
      const isExclude = pattern.startsWith("-")
      const isInclude = pattern.startsWith("+")
      const effectivePattern = isExclude || isInclude ? pattern.slice(1).trim() : pattern

      if (matchesPattern(effectivePattern, repoInfo)) {
        includeRepo = !isExclude
      }
    })
  }

  if (includeRepo) {
    const buttons = document.querySelectorAll("form[aria-label='Select projects'] .collapsible-sidebar-widget-button")
    buttons.forEach(x => x.dispatchEvent(new Event("mousedown")))
  }
})