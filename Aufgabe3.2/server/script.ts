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
        console.log("I hear voices!");
        console.log(_request.url);
        //Header hat Meta Angaben und Steuerungs Elemente
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
        if (_request.url) {                                                                                //wenn wir request (Parameter) bekommen, dann
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            if (<string>url.pathname == "/html") {
                for (let key in url.query) {
                    _response.write(key + ":" + url.query[key]);
                }
            }
            if (<string>url.pathname == "/json") {
                console.log(JSON.stringify(url.query));
                _response.write(JSON.stringify(url.query));
            }
        }
        _response.end();
    }


}