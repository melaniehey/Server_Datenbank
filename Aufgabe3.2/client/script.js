"use strict";
var P_3_2Server;
(function (P_3_2Server) {
    let displayResponse = document.getElementById("answer");
    async function sendDataHTML() {
        let formData = new FormData(document.forms[0]); //
        let url = "https://gissose21.herokuapp.com"; //Anfrage
        url += "/html"; // /html wir an url gehängt
        let query = new URLSearchParams(formData); //
        url = url + "?" + query.toString();
        let answer = await fetch(url);
        let output = await answer.text();
        displayResponse.innerText = output;
    }
    async function sendDataJSON() {
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose21.herokuapp.com";
        url += "/json";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let answer = await fetch(url);
        let jsonOutput = await answer.json();
        console.log("JSON: Antwort:");
        console.log(jsonOutput);
    }
    let sendButtonHTML = document.getElementById("htmlbutton");
    sendButtonHTML.addEventListener("click", sendDataHTML);
    let sendButtonJSON = document.getElementById("jsonbutton");
    sendButtonJSON.addEventListener("click", sendDataJSON);
})(P_3_2Server || (P_3_2Server = {}));
//# sourceMappingURL=script.js.map