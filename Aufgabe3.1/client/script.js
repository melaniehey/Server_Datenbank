"use strict";
var P_3_1Server;
(function (P_3_1Server) {
    async function sendData() {
        let formData = new FormData(document.forms[0]);
        console.log(":" + formData.get("name"));
        for (let entry of formData) {
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        let _url = "https://gissose21.herokuapp.com/";
        _url = _url + "?" + query.toString();
        let answer = await fetch(_url);
        let output = await answer.text();
        let displayResponse = document.getElementById("answer");
        displayResponse.innerText = output;
    }
    let sendButton = document.getElementById("button");
    sendButton.addEventListener("click", sendData);
})(P_3_1Server || (P_3_1Server = {}));
//# sourceMappingURL=script.js.map