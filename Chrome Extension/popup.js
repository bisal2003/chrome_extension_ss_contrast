if(document.querySelector(".popup")){
    const button = document.querySelector(".button")
    const circle = document.querySelector(".circle")
    
    let buttonOn = false;
    
    button.addEventListener("click", ()=>{
        if(!buttonOn){
            buttonOn = true;
            circle.style.animation = "moveCircleRight 1s forwards";
            button.style.animation = "transformToYellow 1s forwards";
            chrome.tabs.executeScript({
                file: "appOn.js"
            })
        } else{
            buttonOn = false;
            circle.style.animation = "moveCircleLeft 1s forwards";
            button.style.animation = "transformToBlue 1s forwards";
            chrome.tabs.executeScript({
                file: "appOff.js"
            })
        }
    })
    }
// Screenshot functionality (same as before)
document.getElementById("screenshotButton").addEventListener("click", () => {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
        if (dataUrl) {
            // Convert the data URL to a Blob
            const byteString = atob(dataUrl.split(",")[1]);
            const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
            const buffer = new Uint8Array(byteString.length);

            for (let i = 0; i < byteString.length; i++) {
                buffer[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([buffer], { type: mimeString });

            // Use the Chrome Downloads API to save the file
            const url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: "screenshot.png",
            }, () => {
                // Revoke the object URL to free memory
                URL.revokeObjectURL(url);
                console.log("Screenshot saved successfully!");
            });
        } else {
            console.error("Failed to capture screenshot.");
        }
    });
});
