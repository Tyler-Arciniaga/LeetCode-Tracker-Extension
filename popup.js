chrome.runtime.onConnect.addListener((port) => {
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

