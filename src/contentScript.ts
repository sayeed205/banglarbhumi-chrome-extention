"use strict";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "print") {
    let htmlNode = document.getElementById("plotdetails");
    if (!htmlNode) {
      alert(
        "Did not find any plot details. Please check if you are on the correct page."
      );
      return;
    }

    let html = htmlNode.innerHTML;
    html = html.replace(/style=".*?"/g, "");
    html = html.replace(/iframe/g, "div");

    let printWindow = window.open(
      "",
      "Print",
      "width=800,height=600"
    ) as Window;
    printWindow.document.write(
      `<html><head><title>Banglar Bhumi PDF Downloader</title></head><body>${html}</body></html>`
    );
    printWindow.document.close(); // necessary for IE >= 10
    printWindow.focus(); // necessary for IE >= 10*/
    printWindow.print();
    printWindow.close();
  }

  // test api url if possible to use instead of scraping html
  //   const url =
  //     "https://banglarbhumi.gov.in/BanglarBhumi/plotDetailsAction_LandInfo.action";

  //   const xhr = new XMLHttpRequest();

  //   const formData = new FormData();
  //   formData.append("lstDistrictCode1", "09");
  //   formData.append("lstBlockCode1", "14_NEW");
  //   formData.append("lstMouzaList", "088");
  //   formData.append("txtKhatian1", "8323");
  //   formData.append("txtKhatian2", "");
  //   formData.append("radioKhatianDtlType", "0");
  //   formData.append("ajax", "true");

  //   xhr.open("POST", url, true);
  //   xhr.setRequestHeader(
  //     "Content-Type",
  //     "application/x-www-form-urlencoded ; charset=UTF-8"
  //   );
  //   xhr.withCredentials = true;
  //   xhr.send(formData);
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       console.log(xhr.responseText);
  //     }
  //   };

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});
