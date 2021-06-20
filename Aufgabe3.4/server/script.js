"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_4Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_4Server;
(function (P_3_4Server) {
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    startServer(port);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Starting server" + _port);
        server.addListener("request", handleRequest);
        server.listen(_port);
    }
    let databaseURL = "mongodb+srv://mylany:passwordabc@giscluster.4mjef.mongodb.net/Abgabe3_4?retryWrites=true&w=majority";
    async function handleRequest(_request, _response) {
        //ändern damit es zum json passt (Contenttype). Man sagt dem PC das man eine Antwort vom Typ JSON sendet.         
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        if (_request.url) {
            let url = Url.parse(_request.url, true); //URL wird zum String umgewandelt. Kein json deshalb kein stringify
            let path = url.pathname;
            let input = { name: url.query.name + "", mail: url.query.email + "", subject: url.query.subject + "" };
            if (path == "/sendData") { //Wenn am ende /html angehängt wurde
                let data = await sendDatabaseData(databaseURL, input);
                _response.write(data);
            }
            else if (path == "/getData") {
                let data = await getDatabaseData(databaseURL);
                _response.write(JSON.stringify(data));
                console.log(data);
            }
        }
        _response.end();
    }
    async function getDatabaseData(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; //URL Parser wird benutzt, True das es benutzt werden soll
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let orders = mongoClient.db("Abgabe3_4").collection("Daten");
        console.log("Database connection", orders != undefined);
        let cursor = orders.find();
        let data = await cursor.toArray();
        return data; //jetzt kann man zur Database connecten
    }
    async function sendDatabaseData(_url, _formData) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; //URL Parser wird benutzt, True das es benutzt werden soll
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let orders = mongoClient.db("Abgabe3_4").collection("Daten");
        orders.insertOne(_formData);
        let answer = "ThisIsAnAnswer";
        return answer;
    }
})(P_3_4Server = exports.P_3_4Server || (exports.P_3_4Server = {}));
//# sourceMappingURL=script.js.map