import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Prüfungsabgabe {

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100; //Port wird auf 8100 gesetzt (localhost:8100)

    startServer(port);

    function startServer(_port: number): void {
        let server: Http.Server = Http.createServer();
        console.log("Starting server on port: " + _port);

        server.addListener("request", handleRequest);
        server.listen(_port);

    }

    let databaseURL: string = "mongodb+srv://mylany:passwordabc@giscluster.4mjef.mongodb.net/Abgabe3_4?retryWrites=true&w=majority";


    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("Nachricht");

        //ändern damit es zum json passt (Contenttype). Man sagt dem PC das man eine Antwort vom Typ JSON sendet. 
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Eigenschaften und der Typ ist HTML
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugriffserlaubnis, durch * dürfen alle darauf zugreifen

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); //umwandeln in String/assoziatives Array
            // let card: MemoryPicture = { namePicture: url.query.namePicture + "", urlPicture: url.query.urlPicture + "" }; //mit "" wird es als ein String gesehen
            // let remove: string | string[] = url.query.namePicture + "";
            // let score: Scoredata = { playerName: url.query.playerName + "", playerTime: parseInt(url.query.playerTime + "") };

            let x: string = JSON.stringify(url.query); //in string umwandeln
            console.log(x);

            if (url.pathname == "sendInfo") {
                let playerName: Scoredata = JSON.parse(x); //in json-objekt
                let antwort: string = await einspeichern(databaseURL, playerName);
                _response.write(antwort);
            }
        }
        _response.write("My response");
        _response.end();

    }

    async function einspeichern(_url: string, _playerName: Scoredata): Promise<string> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; //URL Parser wird benutzt, True das es benutzt werden soll
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let meineDatenbank: Mongo.Collection = mongoClient.db("Prüfungsabgabe").collection("Time");
        meineDatenbank.insertOne(_playerName);
        return("Wurde angelegt");
    }


    interface MemoryPicture {
        namePicture: string;
        urlPicture: string;
    }

    interface Scoredata {
        playerName: string;
        playerTime: number;
    }
}