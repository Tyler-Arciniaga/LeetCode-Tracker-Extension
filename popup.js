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


    loadAPIScript(() => {
        initAPIClient(() => {
            chrome.runtime.sendMessage({action: "logData", data: data}, function(response) {
                console.log(response.message);
            });
            
        });
    });
});

//dynammically loads the Google API script
function loadAPIScript(callback){
    const script = document.createElement("script"); //this is working with background.js's virtual DOM
    script.src = "https://apis.google.com/js/api.js";
    script.onload = callback;
    script.onerror = () => {
        console.error("Failed to load Google API library.");
    };
    document.head.appendChild(script);
}

function initAPIClient(callback){
    const CLIENT_ID = "537951284717-vqndplk40e9sk68pvlv627c74esa2123.apps.googleusercontent.com";
    const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.load('client:auth2', () => {
        gapi.client.init({
            clientID: CLIENT_ID,
        }).then(() => {
            console.log("Google Sheets API client initialized!");
            gapi.client.init({
                apiKey: "",
                discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            }).then(() => {
                console.log("API client loaded");
                callback();
            }).catch(error => {
                console.error("Error initializing Google API client:", error);
            });
        });
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

    

