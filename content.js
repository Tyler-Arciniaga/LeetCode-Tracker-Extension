console.log("Content Script is Running!");

function readLCData() {
    // Use setTimeout or MutationObserver to delay script execution or wait for the DOM to load
    setTimeout(function() {
        const problem_title_elements = document.getElementsByClassName("no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate cursor-text whitespace-normal hover:!text-[inherit]");
        console.log(problem_title_elements[0].textContent); // Should log HTMLCollection with elements if available
        const problem_difficulty_elements = document.getElementsByClassName("relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-easy dark:text-difficulty-easy");
        console.log(problem_difficulty_elements[0].textContent);
    }, 1000); // Delay by 1 second (adjust timing based on page load speed)
}

function handleError(error){
    console.log(`Error ${error}`)
}

function sendLCData() {
    chrome.runtime.sendMessage({
        action: "problem_data",
        data: {title: "testing"},
    }, (response) => {
        if (chrome.runtime.lastError){
            console.error("Error sending message:", chrome.runtime.lastError);
        }
        else{
            console.log("Message sent!:",response)
        }
    });
}


readLCData();
console.log("LOVEYDOVEY");
sendLCData();



