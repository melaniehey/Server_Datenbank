"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT); //create Port - "Tor" zum Server. neue variable um sich mit dem server zu verbinden
    if (!port) //Port ist "Hausnummer". UNSER port ist 8100, der muss immer da hin
        port = 8100; //set port to 8100 (if it wasn t before). 
    let server = Http.createServer(); //create server
    server.addListener("request", handleRequest); //Listener for Requests and Listen functions
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url); //gibt antwort zurück /url der antwort
        _response.end();
        //gibt zugriffserlaubnis
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=script.js.map