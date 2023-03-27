"use strict";

import "./popup.css";

(async function () {
  const tabs: chrome.tabs.Tab[] = await new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs);
    });
  });

  const activeTab = tabs[0];

  /**
   * Calls a function to send a message to the active tab in Chrome with type "print".
   *
   * @returns {void}
   */
  const printHandler = (): void => {
    if (typeof activeTab.id === "undefined") return;
    console.log("Sending message to print");

    chrome.tabs.sendMessage(activeTab.id, { type: "print" }, (response) => {
      console.log("Received response", response);
    });
  };

  const print = document.getElementById("print") as HTMLButtonElement;

  print.addEventListener("click", printHandler);
})();
