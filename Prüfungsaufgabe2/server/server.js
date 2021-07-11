"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prüfungsabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Prüfungsabgabe;
(function (Prüfungsabgabe) {
    let myDatabaseScores;
    let myDatabasePictures;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    startServer(port);
    let databaseURL = "mongodb+srv://mylany:passwordabc@giscluster.4mjef.mongodb.net/Prüfungsabgabe?retryWrites=true&w=majority";
    databaseConnected(databaseURL);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Starting server on port: " + _port);
        server.addListener("request", handleRequest);
        server.listen(_port);
    }
    async function handleRequest(_request, _response) {
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "application/json");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            //highscore speichern
            if (url.pathname == "/sendInfo") {
                let jsonString = JSON.stringify(url.query);
                saveEntry(url.query);
            }
            //highscore aufrufen
            if (url.pathname == "/showInfo") {
                let cursor = myDatabaseScores.find();
                let scoreData = await cursor.toArray();
                _response.write(JSON.stringify(scoreData));
            }
            //Bild speichern
            if (url.pathname == "/sendPicture") {
                let jsonString = JSON.stringify(url.query);
                savePicture(url.query);
            }
            //Bild aufrufen
            if (url.pathname == "/showPicture") {
                let cursor = myDatabasePictures.find();
                let pictureData = await cursor.toArray();
                _response.write(JSON.stringify(pictureData));
            }
            //Bild löschen
            // if (url.pathname == "/deletePicture") {
            //     //let cursor: Mongo.Cursor = <any>myDatabasePictures.deleteOne("url": url); 
            //     //let pictureData: MemoryPicture[] = await cursor.toArray();
            //     _response.write(url.query);
            //     deletePicture(url.query);
            // }
        }
        _response.end();
    }
    async function databaseConnected(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        myDatabaseScores = mongoClient.db("Prüfungsabgabe").collection("Player");
        myDatabasePictures = mongoClient.db("Prüfungsabgabe").collection("Cards");
    }
    function saveEntry(_playerName) {
        myDatabaseScores.insert(_playerName);
        return ("Your entry has been saved.");
    }
    function savePicture(_picture) {
        myDatabasePictures.insert(_picture);
        return ("Your image has been saved.");
    }
})(Prüfungsabgabe = exports.Prüfungsabgabe || (exports.Prüfungsabgabe = {}));
//# sourceMappingURL=server.js.map