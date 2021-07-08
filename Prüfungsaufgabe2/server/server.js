"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prüfungsabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Prüfungsabgabe;
(function (Prüfungsabgabe) {
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100; //Port wird auf 8100 gesetzt (localhost:8100)
    startServer(port);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Starting server on port: " + _port);
        server.addListener("request", handleRequest);
        server.listen(_port);
    }
    let databaseURL = "mongodb+srv://mylany:passwordabc@giscluster.4mjef.mongodb.net/Abgabe3_4?retryWrites=true&w=majority";
    async function handleRequest(_request, _response) {
        console.log("Nachricht");
        //ändern damit es zum json passt (Contenttype). Man sagt dem PC das man eine Antwort vom Typ JSON sendet. 
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Eigenschaften und der Typ ist HTML
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugriffserlaubnis, durch * dürfen alle darauf zugreifen
        if (_request.url) {
            let url = Url.parse(_request.url, true); //umwandeln in assoziatives Array
            let jsonString = JSON.stringify(url.query); //in string umwandeln damit man es ausgeben kann //test                            //braucht man nicht, muss aber dann die if darunter ändern
            console.log(jsonString);
            //wenn diese zwei zeilen weg n´sind muss man hier unten nicht mehr parsen sondern kann es direkt wegschicken
            if (url.pathname == "sendInfo") { //url mit sendInfo wird abgefangen
                let playerName = JSON.parse(jsonString); //jsonString(habe ich oben mit stringify gewandelt) wieder in json-objekt umwandeln
                let answer2 = await saveEntry(databaseURL, playerName);
                _response.write(answer2);
            }
        }
        _response.write("My response");
        _response.end();
    }
    //das was bei (Zeile 40)"let answer2 ... save(databaseURL, playerName)" am ende als Parameter angegeben, kommt hier als Param in die Funktion.
    async function saveEntry(_url, _playerName) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; //URL Parser wird benutzt, True das es benutzt werden soll
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect(); //connected zu datenbank
        let myDatabase = mongoClient.db("Prüfungsabgabe").collection("Time");
        myDatabase.insertOne(_playerName); //playerName wird mit Timer in der db eingespeichert, ***, insert, und wenn man löscht dann remove
        return ("entry is registered");
        //*** und gibt es den string zurück, und den string schreibt man dann als antwort beim client. Beim client wird der string dann ausgewertet
    }
})(Prüfungsabgabe = exports.Prüfungsabgabe || (exports.Prüfungsabgabe = {}));
//# sourceMappingURL=server.js.map