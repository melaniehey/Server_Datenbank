"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prüfungsabgabe = void 0;
const Http = require("http");
var Prüfungsabgabe;
(function (Prüfungsabgabe) {
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100; //Port wird auf 8100 gesetzt (localhost:8100)
    startServer(port);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Starting server" + _port);
        server.addListener("request", handleRequest);
        server.listen(_port);
    }
    let databaseURL = "mongodb+srv://mylany:passwordabc@giscluster.4mjef.mongodb.net/Abgabe3_4?retryWrites=true&w=majority";
    async function handleRequest(_request, _response) {
        //hier aufruf der Funktionen, je nachdem was man gedrückt hat 
        console.log("Angekommen.");
    }
})(Prüfungsabgabe = exports.Prüfungsabgabe || (exports.Prüfungsabgabe = {}));
//# sourceMappingURL=server.js.map