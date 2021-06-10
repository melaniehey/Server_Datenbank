namespace P_3_2Server {
    let displayResponse: HTMLParagraphElement = <HTMLDivElement>document.getElementById("answer");
    async function sendDataHTML(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);                               //Formular. Wie ein Array mit Key und Value. 
                                                                                                //Dieses Array wird wieder in Array gespeichert, nähmlich document.forms. 
                                                                                                //Es gibt nur 1 Folmular, also [0]
        let url: RequestInfo = "https://gissose21.herokuapp.com";                               //Anfrage
        url += "/html";                                                                         // /html wir an url gehängt
        //tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();                                                     //HTML wir in einem String ausgegeben
        let answer: Response = await fetch(url);                                                //await wartet bis vom Server ein Rückmeldung kam, also wieder was zurück gesendet wurde.
        let output: string = await answer.text();                                               
        displayResponse.innerHTML = output; 
    }
    async function sendDataJSON(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);


        let url: RequestInfo = "https://gissose21.herokuapp.com";
        url += "/json";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        let answer: Response = await fetch(url);
        let jsonOutput: JsonAnswer = await answer.json();                                       //Im Server wurde das zum String formatiert.
                                                                                                //Hier wird es wieder zum json
        console.log("JSON: Antwort:");
        console.log(jsonOutput);


    }

    let sendButtonHTML: HTMLButtonElement = <HTMLButtonElement>document.getElementById("htmlbutton");
    sendButtonHTML.addEventListener("click", sendDataHTML);
    let sendButtonJSON: HTMLButtonElement = <HTMLButtonElement>document.getElementById("jsonbutton");
    sendButtonJSON.addEventListener("click", sendDataJSON);
    //Beim Button klick wird Variable erstellt. Und gesagt mit welchem Server kommuniziert wird (URL)
    //URL wird mit /html und /json außeinandergehalten 

    interface JsonAnswer {
        name: string;
        email: string;
        subject: string;
    }
}