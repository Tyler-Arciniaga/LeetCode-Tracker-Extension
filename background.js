require('dotenv').config();

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
        data = message.data;
        console.log("logged data from popup.js recieved")

        logToGoogleSheets(data)
            .then(() => {
                sendResponse({status: "success",message: "Data logged to Google Sheets :)"});
            })
            .catch((error) => {
                console.error(error);
                sendResponse({status: "error",message: "Failed to log data :("});
            });
    }

    return true; //needed in order to keep message channel open for the async response

});


//load Google API and authenticate users
function initializeGoogleAPI() {
    gapi.load('client:auth2', () => {
        gapi.auth2.init({
            client_id: process.env.CLIENT_ID
        }).then(() => {
            console.log("Google API client initialized");
        }).catch(error => {
            console.error("Error initalizing Google API client:", error);
        });
    });
}

//authenticate users and get personal access token
function authenticateUser() {
    const authInstance = gapi.auth2.getAuthInstance
}

