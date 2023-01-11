const url = "https://banglarbhumi.gov.in/BanglarBhumi/KnowYourProperty.action";
async function getTabUrl() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs.length > 0 ? tabs[0].url : null;
}

const notPopupHtml = `
<p>This extension only works on Banglar Bhumi website after searching plot.</p>
`;

async function setPopup() {
    const tabUrl = await getTabUrl();
    if (tabUrl !== url) {
        document.querySelector("body").innerHTML = notPopupHtml;
    }
}
setPopup();

const printBtn = document.getElementById("print");

async function getTabId() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs.length > 0 ? tabs[0].id : null;
}

printBtn.addEventListener("click", async () => {
    const tabID = await getTabId();

    chrome.scripting.executeScript({
        target: { tabId: tabID },
        function: print,
    });
});

function print() {
    let html = document.getElementById("plotdetails").innerHTML;
    html = html.replace(/style/gi, "j");
    html = html.replace(/iframe/gi, "div");

    let myWindow = window.open(
        "",
        "PRINT",
        "height=650,width=900,top=100,left=150"
    );

    myWindow.document.write(
        `<html><head><title>Banglar Bhumi PDF Downloader</title>`
    );
    myWindow.document.write("</head><body >");
    myWindow.document.write(html);
    myWindow.document.write("</body></html>");

    myWindow.document.close(); // necessary for IE >= 10
    myWindow.focus(); // necessary for IE >= 10*/
    myWindow.print();

    return true;
}
