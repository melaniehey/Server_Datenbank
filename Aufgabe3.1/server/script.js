"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT); //erstellt Port, also ein "Tor" zum Server. Variable um sich mit dem Server zu verbinden
    if (!port) //Port ist der "Hafen"/"Ladesetelle"/"Hausnummer". Unser port ist 8100. Es wird gesendet und empfangen.
        port = 8100; //Port auf 8100 setzten, wenn es nicht davor schon so gesetzt wurde
    let server = Http.createServer(); //erstellt Server
    server.addListener("request", handleRequest); //Listener für Anfragen und das abhören der Anfragen -Funktionen dem Server hinzugeben (= addEventListener)
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); //Anfrage die uns erreicht hat wird ausgegeben, sowie die Antwort die man zurückschickt
        console.log(_request.url);
        //Header hat Meta Angaben und Steuerungs Elemente
        _response.setHeader("content-type", "text/html; charset=utf-8"); //wenn Anfragen versenden werden, setzt man Header. Hier ist die Antowort die man zurückschickt vom Typ TextHTML
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Es bestimmt wer diese Antwort empfangen darf. Stern: Jeder darf von überall darauf zugreifen und Anfragen an diesen Server senden und eine Antwort zurück bekommen
        _response.write(_request.url); //Antwort ist die URL von der Anfrage
        _response.end(); //Antwort wurde geschrieben, jetzt schick die Antwort zurück
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=script.js.map