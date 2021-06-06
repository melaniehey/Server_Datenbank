namespace P_3_2Server {
    let displayResponse: HTMLParagraphElement = <HTMLDivElement>document.getElementById("answer");
    async function sendDataHTML(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        //console.log(":" + formData.get("name"));
        //for (let entry of formData) {
        //    console.log(entry);
        //    console.log("name: " + entry[0]);
        //    console.log("value: " + entry[1]);
        //}


        let _url: RequestInfo = "https://gissose21.herokuapp.com";
        _url += "/html";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let answer: Response = await fetch(_url);
        let output: string = await answer.text();
        displayResponse.innerText = output;
    }
    async function sendDataJSON(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        //console.log(":" + formData.get("name"));
        //for (let entry of formData) {
        //    console.log(entry);
        //    console.log("name: " + entry[0]);
        //    console.log("value: " + entry[1]);
        //}


        let _url: RequestInfo = "https://gissose21.herokuapp.com";
        _url += "/json";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let answer: Response = await fetch(_url);
        let output: string = await answer.text();
        let jsonOutput: string =  output.substring(6, output.length - 1);

        console.log(output.substring(6, output.length - 1));

        console.log("JSON: Antwort:");
        console.log(jsonOutput);
        displayResponse.innerHTML = jsonOutput;
        console.log(displayResponse);
        console.log(answer);


    }

    let sendButtonHTML: HTMLButtonElement = <HTMLButtonElement>document.getElementById("htmlbutton");
    sendButtonHTML.addEventListener("click", sendDataHTML);
    let sendButtonJSON: HTMLButtonElement = <HTMLButtonElement>document.getElementById("jsonbutton");
    sendButtonJSON.addEventListener("click", sendDataJSON);

    /*interface JsonAnswer {
        name: string;
        email: string;
        subject: string;
    }*/
}