"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_4Server = void 0;
const Http = require("http");
const Url = require("url");
var P_3_4Server;
(function (P_3_4Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log(_request.url);
        //ändern damit es zum json passt (Contenttype). Man sagt dem PC das man eine Antwort vom Typ JSON sendet.         
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true); //URL wird zum String umgewandelt. Kein json deshalb kein stringify
            let path = url.pathname;
            if (path == "/html") { //Wenn am ende /html angehängt wurde
                _response.setHeader("content-type", "text/html; charset=utf-8");
                for (let key in url.query) {
                    _response.write("<p>" + key + ":" + url.query[key] + "</p>"); //name: melanie wird ausgegeben, vom Interface
                }
            }
            if (path == "/json") {
                _response.setHeader("content-type", "application/json");
                let sentObject = JSON.stringify(url.query); //json in string umwandeln
                console.log(sentObject);
                _response.write(sentObject); //bei /json wird string ausgegeben
            }
        }
        _response.end();
    }
})(P_3_4Server = exports.P_3_4Server || (exports.P_3_4Server = {}));
//# sourceMappingURL=script.js.map