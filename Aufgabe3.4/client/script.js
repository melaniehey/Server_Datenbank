"use strict";
var P_3_4Server;
(function (P_3_4Server) {
    let displayResponse = document.getElementById("answer");
    async function sendData() {
        let formData = new FormData(document.forms[0]); //Formular. Wie ein Array mit Key und Value. 
        //Dieses Array wird wieder in Array gespeichert, nähmlich document.forms. 
        //Es gibt nur 1 Folmular, also [0]
        let url = "https://gissose21.herokuapp.com"; //Anfrage
        url += "/sendData"; // /html wir an url gehängt
        //tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let answer = await fetch(url);
        console.log(answer);
    }
    async function getData() {
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose21.herokuapp.com";
        url += "/getData";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let answer = await fetch(url);
        let output = await answer.text();
        displayResponse.innerHTML = output;
    }
    document.getElementById("sendButton").addEventListener("click", sendData);
    document.getElementById("getButton").addEventListener("click", getData);
    //Beim Button klick wird Variable erstellt. Und gesagt mit welchem Server kommuniziert wird (URL)
})(P_3_4Server || (P_3_4Server = {}));
//# sourceMappingURL=script.js.map