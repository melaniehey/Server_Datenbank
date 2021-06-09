import * as Http from "http";
import * as Url from "url";

export namespace P_3_2Server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);        
    if (!port)
        port = 8100;                                     

    let server: Http.Server = Http.createServer();      
    server.addListener("request", handleRequest);       
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {                     
        console.log("Listening");
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {      
        console.log(_request.url);
          //ändern damit es zum json passt (Contenttype). Man sagt dem PC das man eine Antwort vom Typ JSON sendet.         
        _response.setHeader("Access-Control-Allow-Origin", "*");  
        
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); 
            let path: string = <string>url.pathname; 
            if (path == "/html") {  //Wenn am ende /html angehängt wurde
                _response.setHeader("content-type", "text/html; charset=utf-8");
                for (let key in url.query) {
                    _response.write("<p>" + key + ":" + url.query[key] + "</p>");  //author: melanie wird ausgegeben, vom package.json
                }
            }
            if (path == "/json") {
                _response.setHeader("content-type", "application/json");
                let sentObject: string = JSON.stringify(url.query); //json in string umwandeln
                console.log(sentObject);
                _response.write(sentObject); //bei /json wird string ausgegeben
                
            }
        }
        _response.end();
    }


}