"use strict";
var P_3_4Server;
(function (P_3_4Server) {
    let displayResponse = document.getElementById("answer");
    async function sendDataHTML() {
        let formData = new FormData(document.forms[0]); //Formular. Wie ein Array mit Key und Value. 
        //Dieses Array wird wieder in Array gespeichert, nähmlich document.forms. 
        //Es gibt nur 1 Folmular, also [0]
        let url = "https://gissose21.herokuapp.com"; //Anfrage
        url += "/html"; // /html wir an url gehängt
        //tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString(); //HTML wir in einem String ausgegeben
        let answer = await fetch(url); //await wartet bis vom Server ein Rückmeldung kam, also wieder was zurück gesendet wurde.
        let output = await answer.text();
        displayResponse.innerHTML = output;
    }
    async function sendDataJSON() {
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose21.herokuapp.com";
        url += "/json";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let answer = await fetch(url);
        let jsonOutput = await answer.json(); //Im Server wurde das zum String formatiert.
        //Hier wird es wieder zum json
        console.log("JSON: Antwort:");
        console.log(jsonOutput);
    }
    let sendButtonHTML = document.getElementById("htmlbutton");
    sendButtonHTML.addEventListener("click", sendDataHTML);
    let sendButtonJSON = document.getElementById("jsonbutton");
    sendButtonJSON.addEventListener("click", sendDataJSON);
})(P_3_4Server || (P_3_4Server = {}));
//# sourceMappingURL=script.js.map