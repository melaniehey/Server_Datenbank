namespace P_3_2Server {
    let displayResponse: HTMLParagraphElement = <HTMLDivElement>document.getElementById("answer");
    async function sendDataHTML(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]); //


        let url: RequestInfo = "https://gissose21.herokuapp.com"; //Anfrage
        url += "/html";                                           // /html wir an url gehängt
        let query: URLSearchParams = new URLSearchParams(<any>formData); //
        url = url + "?" + query.toString();
        let answer: Response = await fetch(url);
        let output: string = await answer.text();
        displayResponse.innerText = output; 
    }
    async function sendDataJSON(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);


        let url: RequestInfo = "https://gissose21.herokuapp.com";
        url += "/json";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        let answer: Response = await fetch(url);
        let jsonOutput: JsonAnswer =  await answer.json();

        console.log("JSON: Antwort:");
        console.log(jsonOutput);


    }

    let sendButtonHTML: HTMLButtonElement = <HTMLButtonElement>document.getElementById("htmlbutton");
    sendButtonHTML.addEventListener("click", sendDataHTML);
    let sendButtonJSON: HTMLButtonElement = <HTMLButtonElement>document.getElementById("jsonbutton");
    sendButtonJSON.addEventListener("click", sendDataJSON);

    interface JsonAnswer {
        name: string;
        email: string;
        subject: string;
    }
}