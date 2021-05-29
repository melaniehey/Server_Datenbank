namespace P_3_1Server {
    async function sendData(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        console.log(":" + formData.get("name"));
        for (let entry of formData) {
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let _url: RequestInfo = "https://gissose21.herokuapp.com/";
        _url = _url + "?" + query.toString();
        let answer: Response = await fetch(_url);
        let output: string = await answer.text();
        let displayResponse: HTMLParagraphElement = <HTMLDivElement>document.getElementById("answer");
        displayResponse.innerText = output;
    }
    let sendButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
    sendButton.addEventListener("click", sendData);
}