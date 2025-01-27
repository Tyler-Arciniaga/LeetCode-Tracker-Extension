const storeProblemData = async (title,difficulty) => {
    try {
        await chrome.storage.local.set({
            problemData: {
                title,
                difficulty,
                timeStamp: Date.now()
            }
        });
        console.log("Data succesfully stored:",title,difficulty);
    } catch(error){
        console.error("Error storing data:", error);
    }
};

const getProblemData = async () => {
    try{
        const result = await chrome.storage.local.get("problemData");
        return result.problemData || null;
    } catch(error){
        console.error("Error getting stored data:", error);
        return null;
    }
};

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "problem_data") {
        console.log("Received from content.js:", message.data);
        const {title, difficulty} = message.data;
        
        console.log("data received from content.js:", title, "/", difficulty);

        storeProblemData(title,difficulty);
        
        try {
            setTimeout(() => {
                sendResponse({status: "success", message: "Data Received from content.js to background.js"});
            }, 1000);
        } catch(error) {
            console.error("Error sending response from background:", error);
            sendResponse({
                status: "error",
                message: "Error sending data back"
            });
        }
    } else if (message.action === "logData") {
        const { token, data } = message;
        logDataToGoogleSheets(token, data)
            .then(response => {
                sendResponse({ success: true, response });
            })
            .catch(error => {
                console.error("Error logging to sheets:", error);
                sendResponse({ success: false, error: error.message });
            });
        return true; // Keep the message channel open for async response
    }
    return true;
});

// Handle connection from popup
chrome.runtime.onConnect.addListener(async (port) => {
    if(port.name === "popup.js"){
        const problemData = await getProblemData();
        console.log("Popup Connected to Background. Sending stored problem data!:", problemData);

        if(problemData && problemData.title){
            console.log("Sending data from background to popup now!")
            port.postMessage({
                action: "problem_data",
                data: {
                    title: problemData.title, 
                    difficulty: problemData.difficulty
                }
            });
        }
    }
});

// Function to log data to Google Sheets using fetch API
async function logDataToGoogleSheets(token, data) {
    const sheetId = "1PemLQl7vTGnCdMHTjLlrJJ3XwgHI3iSRhRqKtCGP1Ak"; // Replace with your actual Google Sheets ID
    const range = "Sheet1!A1"; // Replace with your desired range
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW`;
    
    const requestBody = {
        values: [
            [
                data.official_title, 
                data.official_difficulty,
                data.concept || '',
                data.personal_difficulty || '',
                data.personal_notes || ''
            ]
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Google Sheets API error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const responseData = await response.json();
        console.log("Data logged to Google Sheets:", responseData);
        return responseData;

    } catch (error) {
        console.error("Error in logDataToGoogleSheets:", error);
        throw error;
    }
}