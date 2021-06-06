"use strict";
var P_3_2Server;
(function (P_3_2Server) {
    let displayResponse = document.getElementById("answer");
    async function sendDataHTML() {
        let formData = new FormData(document.forms[0]);
        //console.log(":" + formData.get("name"));
        //for (let entry of formData) {
        //    console.log(entry);
        //    console.log("name: " + entry[0]);
        //    console.log("value: " + entry[1]);
        //}
        let _url = "https://gissose21.herokuapp.com";
        _url += "/html";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let answer = await fetch(_url);
        let output = await answer.text();
        displayResponse.innerText = output;
    }
    async function sendDataJSON() {
        let formData = new FormData(document.forms[0]);
        //console.log(":" + formData.get("name"));
        //for (let entry of formData) {
        //    console.log(entry);
        //    console.log("name: " + entry[0]);
        //    console.log("value: " + entry[1]);
        //}
        let _url = "https://gissose21.herokuapp.com";
        _url += "/json";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let answer = await fetch(_url);
        let output = await answer.text();
        let jsonOutput = output.substring(6, output.length - 1);
        console.log(output.substring(6, output.length - 1));
        console.log("JSON: Antwort:");
        console.log(jsonOutput);
        displayResponse.innerHTML = jsonOutput;
        console.log(displayResponse);
        console.log(answer);
    }
    let sendButtonHTML = document.getElementById("htmlbutton");
    sendButtonHTML.addEventListener("click", sendDataHTML);
    let sendButtonJSON = document.getElementById("jsonbutton");
    sendButtonJSON.addEventListener("click", sendDataJSON);
    /*interface JsonAnswer {
        name: string;
        email: string;
        subject: string;
    }*/
})(P_3_2Server || (P_3_2Server = {}));
//# sourceMappingURL=script.js.map