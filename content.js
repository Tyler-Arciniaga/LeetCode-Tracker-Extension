console.log("Content Script is Running!");
var problem_title = null;

function sendLCData() {

    if(problem_title){
        chrome.runtime.sendMessage({
            action: "problem_data",
            data: {title: problem_title},
        }, (response) => {
            if (chrome.runtime.lastError){
                console.error("Error sending message:", chrome.runtime.lastError);
            }
            else{
                console.log("Message sent!:",response)
            }
        });
    } else{
        console.log("No problem title to send")
    }
    
  
}

function readLCData() {
    // Use setTimeout or MutationObserver to delay script execution or wait for the DOM to load
    setTimeout(function() {
        const problem_title_elements = document.getElementsByClassName("no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate cursor-text whitespace-normal hover:!text-[inherit]");
        problem_title = problem_title_elements[0].textContent
        console.log(problem_title_elements[0].textContent); // Should log HTMLCollection with elements if available
        const problem_difficulty_elements = document.querySelectorAll("[class*='text-difficulty-']");
        console.log(problem_difficulty_elements[0].textContent);
        
        sendLCData();
    }, 1000); // Delay by 1 second (adjust timing based on page load speed)
}

function handleError(error){
    console.log(`Error ${error}`)
}


const observer = new MutationObserver(() => {
    readLCData();
})

readLCData();



