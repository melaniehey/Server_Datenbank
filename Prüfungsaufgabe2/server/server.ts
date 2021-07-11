import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Prüfungsabgabe {



    let myDatabaseScores: Mongo.Collection;
    let myDatabasePictures: Mongo.Collection;


    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100; 

    startServer(port);
    

    let databaseURL: string = "mongodb+srv://mylany:passwordabc@giscluster.4mjef.mongodb.net/Prüfungsabgabe?retryWrites=true&w=majority";
    databaseConnected(databaseURL); 


    function startServer(_port: number): void {
        let server: Http.Server = Http.createServer();
        console.log("Starting server on port: " + _port);

        server.addListener("request", handleRequest);
        server.listen(_port);

    }


    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "application/json");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); 

            //highscore speichern
            if (url.pathname == "/sendInfo") { 
                let jsonString: string = JSON.stringify(url.query);
                saveEntry(url.query);
            }

            //highscore aufrufen
            if (url.pathname == "/showInfo") { 
                let cursor: Mongo.Cursor = myDatabaseScores.find();
                let scoreData: Memory[] = await cursor.toArray();
                _response.write(JSON.stringify(scoreData)); 
            }

            //Bild speichern
            if (url.pathname == "/sendPicture") {
                let jsonString: string = JSON.stringify(url.query);
                savePicture(url.query);
            }

            //Bild aufrufen
            if (url.pathname == "/showPicture") {
                let cursor: Mongo.Cursor = myDatabasePictures.find(); 
                let pictureData: Memory[] = await cursor.toArray(); 
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

    async function databaseConnected(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; 
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        myDatabaseScores = mongoClient.db("Prüfungsabgabe").collection("Player");
        myDatabasePictures = mongoClient.db("Prüfungsabgabe").collection("Cards");

    }

    function saveEntry(_playerName: Memory): string { 
        myDatabaseScores.insert(_playerName);
        return ("Your entry has been saved.");
    }

    function savePicture(_picture: Memory): string {
        myDatabasePictures.insert(_picture);
        return ("Your image has been saved.");
    }

    // function deletePicture(_picture: Memory): string {
    //     myDatabasePictures.deleteOne(_picture);
    //     return ("Your image has been deleted.");
    // }

    interface Memory {  
        [type: string]: string | string[]; 
    }
}