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
    
    chrome.runtime.sendMessage({action: "logData", data: data}, function(response) {
        console.log(response.message);

        if (response.status){
            console.log("Data logged successfully:", response.message);
        } else{
            console.log("Error logging data:",response.message);
        }

    });
})

    



/*

*/

    

