// content.js
let pageHTML = document.documentElement.innerHTML;

// Send the HTML to the extension storage or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPageHTML") {
        sendResponse({ html: pageHTML });
    }
});
