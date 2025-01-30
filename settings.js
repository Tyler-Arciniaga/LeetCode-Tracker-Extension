const port = chrome.runtime.connect({name: "settings.js"});

document.getElementById('go-to-formScreen').onclick = (e) => {
    window.location.href = "./popup.html";
}



document.getElementById("spreadsheet-form").addEventListener("submit", function(event){
    event.preventDefault();
    port.postMessage({action: "Change Spreadsheet ID"});
    console.log("ID Change Submitted.")
});


    