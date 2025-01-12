console.log("Content Script is Running!");

function readLCData() {
    // Use setTimeout or MutationObserver to delay script execution or wait for the DOM to load
    setTimeout(function() {
        const problem_title_elements = document.getElementsByClassName("no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate cursor-text whitespace-normal hover:!text-[inherit]");
        console.log(problem_title_elements[0].textContent); // Should log HTMLCollection with elements if available
        const problem_difficulty_elements = document.getElementsByClassName("relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-easy dark:text-difficulty-easy");
        console.log(problem_difficulty_elements[0].textContent);
    }, 3000); // Delay by 1 second (adjust timing based on page load speed)
}


readLCData();



