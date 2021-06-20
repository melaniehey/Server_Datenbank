import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { start } from "repl";
import { cursorTo } from "readline";

export namespace P_3_4Server {

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;
    startServer(port);
    function startServer(_port: number): void {
        let server: Http.Server = Http.createServer();
        console.log("Starting server" + _port);
        server.addListener("request", handleRequest);
        server.listen(_port);
    }
    let databaseURL: string = "mongodb+srv://mylany:passwordabc@giscluster.4mjef.mongodb.net/Abgabe3_4?retryWrites=true&w=majority";

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        //ändern damit es zum json passt (Contenttype). Man sagt dem PC das man eine Antwort vom Typ JSON sendet.         
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);                        //URL wird zum String umgewandelt. Kein json deshalb kein stringify
            let path: string = <string>url.pathname;
            let input: Data = { name: url.query.name + "", mail: url.query.email + "", subject: url.query.subject + "" };
            if (path == "/sendData") {                                                                  //Wenn am ende /html angehängt wurde
                let data: string = await sendDatabaseData(databaseURL, input);
                _response.write(data);
            }
            else if (path == "/getData") {
                let data: Data[] = await getDatabaseData(databaseURL);
                _response.write(JSON.stringify(data));
                console.log(data);
                
            }
        }
        _response.end();
    }
    interface Data {
        name: string;
        mail: string;
        subject: string;
    }

    async function getDatabaseData(_url: string): Promise<Data[]> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; //URL Parser wird benutzt, True das es benutzt werden soll
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let orders: Mongo.Collection = mongoClient.db("Abgabe3_4").collection("Daten");
        console.log("Database connection", orders != undefined);
        let cursor: Mongo.Cursor = orders.find();
        let data: Data[] = await cursor.toArray();
        return data; //jetzt kann man zur Database connecten
    }
    async function sendDatabaseData(_url: string, _formData: Data): Promise<string> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; //URL Parser wird benutzt, True das es benutzt werden soll
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let orders: Mongo.Collection = mongoClient.db("Abgabe3_4").collection("Daten");
        orders.insertOne(_formData);
        let answer: string = "ThisIsAnAnswer";
        return answer;
    }

}