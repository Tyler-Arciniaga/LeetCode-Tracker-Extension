var title = null;
var difficulty = null;

const port = chrome.runtime.connect({name: "popup.js"});

console.log("Attempting to connect with background.js...");

port.onMessage.addListener((message) => {
    console.log("Received from background.js:", message);
    if (message.action === "problem_data") {
        if (!title && !difficulty){
            var title = message.data.title;
            var difficulty = message.data.difficulty;
            
            const title_input = document.getElementsByName("official_title")[0];
            title_input.value = title;

            const difficulty_input = document.getElementsByName("official_difficulty")[0];
            difficulty_input.value = difficulty;   
        }
        else{
            console.log("Already have populated value from LeetCode");
        }
        
    }
});

// Function to get OAuth token using chrome.identity
function getAuthToken(callback) {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        callback(token);
    });
}

// Send data to background.js to log it to Google Sheets
function sendDataToBackground(token, data, callback) {
    chrome.runtime.sendMessage({ 
        action: "logData", 
        token: token, 
        data: data 
    }, (response) => {
        if (response.success) {
            console.log("Data logged successfully:", response);
        } else {
            console.error("Error logging data:", response);
        }
        if (callback) callback(response);
    });
}

// Event listener for form submission
document.getElementById("leetcode-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const questionTitle = document.getElementById("question-title").value;
    const questionDifficulty = document.getElementById("question-difficulty").value;
    const concept = document.getElementById("concepts").value;
    const personalDifficulty = document.getElementById("personal-difficulty").value;
    const personalNotes = document.getElementById("personal-notes").value;

    document.getElementById("leetcode-form").reset();

    console.log(questionTitle, questionDifficulty, concept, personalDifficulty, personalNotes);

    const data = {
        official_title: questionTitle,
        official_difficulty: questionDifficulty,
        concept: concept,
        personal_difficulty: personalDifficulty,
        personal_notes: personalNotes
    };

    // Get auth token and send data
    getAuthToken((token) => {
        if (token) {
            sendDataToBackground(token, data, (response) => {
                console.log(response);  // Handle response after data is logged
            });
        } else {
            console.error("Failed to get auth token");
        }
    });
});