var problem_title_stored = null;
var problem_difficulty_stored = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "problem_data") {
        console.log("Recieved from content.js:", message.data);
        const {title,difficulty} = message.data;
        
        console.log("data recieved from content.js:",title,"/",difficulty);

        problem_title_stored = title;
        problem_difficulty_stored = difficulty;

        

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
        console.log("Popup Connected to Background. Sending stored problem data!:",problem_title_stored,"/",problem_difficulty_stored);

        if(problem_title_stored){
            console.log("Sending data from background to popup now!")
            port.postMessage({
                action: "problem_data",
                data: {title: problem_title_stored, difficulty: problem_difficulty_stored}
            });
        }
    }

});

// everything below is for Google Sheets API CALL

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "logData"){
        console.log("logged data from popup.js recieved")
        sendResponse({status: "success", message: "Data recieved :)"});
    }

    return true; //needed in order to keep message channel open for the async response

});