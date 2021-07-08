"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prüfungsabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Prüfungsabgabe;
(function (Prüfungsabgabe) {
    let myDatabaseScores;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100; //Port wird auf 8100 gesetzt (localhost:8100)
    startServer(port);
    let databaseURL = "mongodb+srv://mylany:passwordabc@giscluster.4mjef.mongodb.net/Abgabe3_4?retryWrites=true&w=majority";
    databaseConnected(databaseURL); //login information
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Starting server on port: " + _port);
        server.addListener("request", handleRequest);
        server.listen(_port);
    }
    async function handleRequest(_request, _response) {
        console.log("Nachricht");
        //ändern damit es zum json passt (Contenttype). Man sagt dem PC das man eine Antwort vom Typ JSON sendet. 
        // _response.setHeader("content-type", "text/html; charset=utf-8"); //Eigenschaften und der Typ ist HTML
        // _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugriffserlaubnis, durch * dürfen alle darauf zugreifen
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "application/json");
        if (_request.url) {
            let url = Url.parse(_request.url, true); //umwandeln in assoziatives Array //Url.query
            //in string umwandeln damit man es ausgeben kann //test                            //braucht man nicht, muss aber dann die if darunter ändern
            //wenn diese zwei zeilen weg n´sind muss man hier unten nicht mehr parsen sondern kann es direkt wegschicken
            if (url.pathname == "/sendInfo") { //url mit sendInfo wird abgefangen (sendInfo wird im client an den link drangehängt)
                // let playerName: Scoredata = JSON.parse(jsonString); //jsonString(habe ich oben mit stringify gewandelt) wieder in json-objekt umwandeln
                let jsonString = JSON.stringify(url.query);
                // let answer2: string = await saveEntry(databaseURL, playerName);
                // _response.write(answer2);
                saveEntry(url.query);
            }
            if (url.pathname == "/showInfo") { //Die Info soll aus DB in score.html gezeigt werden
                let cursor = myDatabaseScores.find();
                let scoreData = await cursor.toArray();
                _response.write(JSON.stringify(scoreData));
            }
        }
        _response.end();
    }
    async function databaseConnected(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; //URL Parser wird benutzt, True das es benutzt werden soll
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect(); //connected zu datenbank
        myDatabaseScores = mongoClient.db("Prüfungsabgabe").collection("Player");
    }
    function saveEntry(_playerName) {
        myDatabaseScores.insert(_playerName);
    }
})(Prüfungsabgabe = exports.Prüfungsabgabe || (exports.Prüfungsabgabe = {}));
//# sourceMappingURL=server.js.map