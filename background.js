var stored_problem_data = null;
var testing = "luffy"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "problem_data") {
        console.log("Recieved from content.js:", message.data);
        const {title} = message.data;
        
        console.log("data recieved from content.js:",title);

        stored_problem_data = title;

        try{
            setTimeout(() => {
                sendResponse({status: "success", message: "Data Recieved from content.js to background.js"});
            },1000);
        } catch(error){
            console.error("Error sending response from background:",error);
            sendResponse({
                status: "error",
                message: "Error sending data back"
            });

        }

        
    }
    return true;
});

chrome.runtime.onConnect.addListener((port) => {
    if(port.name === "popup.js"){
        console.log("Popup Connected to Background. Sending stored problem data!:",stored_problem_data);

        if(stored_problem_data){
            console.log("Sending data from background to popup now!")
            port.postMessage({
                action: "problem_data",
                data: {title: stored_problem_data}
            });
        }
    }

});







/*
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "problem_data") {
        console.log("Recieved from content.js:", message.data);
        const {title} = message.data;
        console.log(title)

        chrome.storage.local.set({title: title},function(){
            console.log("Temporary Data Saved:", title);
        });

        const port = chrome.runtime.connect({name: "background"});
        
        if(port) {
            chrome.storage.local.get("title",function(result) {
                if (chrome.runtime.lastError){
                    console.log("Error retrieving local storage:",chrome.runtime.lastError);
                } else{
                    console.log("Stored value retrieved!:",result.title);
                }
            });
            port.postMessage({
                action: "problem_data",
                data: {result}
            })
        } else{
            console.log("No Connection has been made :(");
        }
    }
});

       
/* 
// Relay the message to the popup (if open)
        const port = chrome.runtime.connect({name: "popup.js Connect"})

        port.postMessage({
            action: "problem_data",
            data: message.data,
        });
        
*/