chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "problem_data") {
        console.log("Recieved problem data from content.js:", message.data);
        
        // Relay the message to the popup (if open)
        const port = chrome.runtime.connect({name: "popup.js Connect"})

        port.postMessage({
            action: "problem_data",
            data: message.data,
        });
    }
});