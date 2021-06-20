namespace P_3_4Server {
    let displayResponse: HTMLParagraphElement = <HTMLDivElement>document.getElementById("answer");
    async function sendData(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);                               //Formular. Wie ein Array mit Key und Value. 
        //Dieses Array wird wieder in Array gespeichert, nähmlich document.forms. 
        //Es gibt nur 1 Folmular, also [0]
        let url: RequestInfo = "https://gissose21.herokuapp.com";                               //Anfrage
        url += "/sendData";                                                                         // /html wir an url gehängt
        //tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();                                                     //HTML wir in einem String ausgegeben
    }
    async function getData(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: RequestInfo = "https://gissose21.herokuapp.com";
        url += "/getData";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        let answer: Response = await fetch(url);
        let output: string = await answer.text();
        displayResponse.innerHTML = output;

    }

    let sendButtonHTML: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendbutton");
    sendButtonHTML.addEventListener("click", sendData);
    let sendButtonJSON: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getbutton");
    sendButtonJSON.addEventListener("click", getData);
    //Beim Button klick wird Variable erstellt. Und gesagt mit welchem Server kommuniziert wird (URL)
}