var title = null

const port = chrome.runtime.connect({name: "popup.js"});

console.log("Attempting to connect with background.js...")

port.onMessage.addListener((message) =>{
    console.log("Recieved from background.js:",message);
    if (message.action === "problem_data"){
        title = message.data.title;
        const title_input = document.getElementsByName("official_title")[0];
        title_input.value = title;
    }
})





/*
chrome.runtime.co.addListener((port) => {
    if (port.name === "popup.js Connect"){
        port.onMessage.addListener((message) => {
            if (message.action === "problem_data"){
                console.log("Recieved problem data from background.js:", message.data);
                const {title} = message.data;

                const title_input = document.getElementsByName("official_title")[0];
                if (title_input){
                    title_input.value = title;
                    }
            }
        });
    }

});




//    
//if (message.action === "problem_data"){
//    console.log("Recieved Problem Data:", message.data);
    
    
//}
//

//console.log(problem_title_elements[0]);
//problem_title_elements[0].value = "lolol";
*/
