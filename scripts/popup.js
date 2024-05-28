document.getElementById("save").addEventListener("click", () => {
  savePatterns()
})

document.getElementById("repoPatterns").addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    savePatterns()
  }
})

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("repoPatterns", (data) => {
    document.getElementById("repoPatterns").value = data.repoPatterns || ""
  })
})

function savePatterns() {
  const repoPatterns = document.getElementById("repoPatterns").value
  chrome.storage.sync.set({ repoPatterns }, () => {
    console.log("Repository patterns saved")
    window.close() // Close the popup after saving
  })
}