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
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "logData"){
        const data = request.data; //data from user form submission
        console.log("Logging data to google sheets:",data);
        
        // Call OAuth to authenticate user and send data to Google Sheets
        chrome.identity.getAuthToken({ interactive: true }, function(token) {
            if (chrome.runtime.lastError) {
                console.error("Error getting token: ", chrome.runtime.lastError);
                return;
            }

            loadSheetsAPI(token,data,sendResponse);
        });

        

        return true; //keeps port open for resposne to be sent asynch
    }
});

function loadSheetsAPI(token,data,sendResponse) {
    // Initialize the Google Sheets API client with the token
    gapi.load('client', () => {
        gapi.client.init({
            apiKey: "", // Your API key (if you are using one)
            access_token: token, // Use the OAuth2 token
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
        }).then(() => {
            logDataToGoogleSheets(data, sendResponse);
        }).catch(err => {
            console.error("Error initializing Google Sheets API client: ", err);
            sendResponse({success: false, error: "Failed to initialize Google Sheets API."})
        });
    });

}


// Function to log data into Google Sheets
function logDataToGoogleSheets(data,sendResponse) {
    const sheetId = "1PemLQl7vTGnCdMHTjLlrJJ3XwgHI3iSRhRqKtCGP1Ak"; 
    const range = "Sheet1!A1"; 

    const resource = {
        values: [
            [data.official_title, data.official_difficulty, data.concept, data.personal_difficulty, data.personal_notes]
        ]
    };

    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: "RAW",
        resource: resource
    }).then(response => {
        console.log("Data logged to Google Sheets:", response);
        sendResponse({sucess: true, message: "Data logged to Google Sheets 〠"})
    }).catch(error => {
        console.error("Error logging data to Google Sheets:", error);
        sendResponse({success: false, error: "Failed to log to Google Sheets :(."})
    });
}



//sendResponse({status: "success", message: "Data logged to Google Sheets 〠"})




/*
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
*/
