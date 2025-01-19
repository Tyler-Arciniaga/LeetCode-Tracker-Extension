var title = null;
var difficulty = null;

const port = chrome.runtime.connect({name: "popup.js"});

console.log("Attempting to connect with background.js...")

port.onMessage.addListener((message) =>{
    console.log("Recieved from background.js:",message);
    if (message.action === "problem_data"){
        title = message.data.title;
        difficulty = message.data.difficulty;
        
        const title_input = document.getElementsByName("official_title")[0];
        title_input.value = title;

        const difficulty_input = document.getElementsByName("official_difficulty")[0];
        difficulty_input.value = difficulty;
    }
})


// everything below here is backend for Google Sheets API interaction
document.getElementById("leetcode-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const questionTitle = document.getElementById("question-title").value;
    const questionDifficulty = document.getElementById("question-difficulty").value;
    const concept = document.getElementById("concepts").value;
    const personalDifficulty = document.getElementById("personal-difficulty").value;
    const personalNotes = document.getElementById("personal-notes").value;


    console.log(questionTitle,questionDifficulty,concept,personalDifficulty,personalNotes);

    const data = {
        official_title: questionTitle,
        official_difficulty: questionDifficulty,
        concept: concept,
        personal_difficulty: personalDifficulty,
        personal_notes: personalNotes
    };



    // Call OAuth to authenticate user and send data to Google Sheets
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
        if (chrome.runtime.lastError) {
            console.error("Error getting token: ", chrome.runtime.lastError);
            return;
        }

        // Initialize the Google Sheets API client with the token
        gapi.load('client', () => {
            gapi.client.init({
                apiKey: "", // Your API key (if you are using one)
                access_token: token, // Use the OAuth2 token
                discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
            }).then(() => {
                logDataToGoogleSheets(data);
            }).catch(err => {
                console.error("Error initializing Google Sheets API client: ", err);
            });
        });
    });
});

// Function to log data into Google Sheets
function logDataToGoogleSheets(data) {
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
    }).catch(error => {
        console.error("Error logging data to Google Sheets:", error);
    });
}

/*
chrome.runtime.sendMessage({action: "logData", data: data}, function(response) {
        console.log(response.message);

        if (response.status === "success"){
            console.log("Data logged successfully into background.js");
        } else{
            console.log("Error logging data to background.js")
        }

    });
*/

    

