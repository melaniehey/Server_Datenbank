//tslint:disable: no-any 
//https://palantir.github.io/tslint/usage/rule-flags/
namespace Prüfungsabgabe {

    let pairAmount: number = 0;

    let interval: any;

    async function showPicture(_case: string): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);

        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let url: string = "https://gissose21.herokuapp.com/showPicture";
        url = url + "?" + query.toString();
        let answer: Response = await fetch(url);
        let images: any = await answer.json();

        images = shuffle(images);

        if (_case == "play") {
            let cardStorage: HTMLDivElement = <HTMLDivElement>document.getElementById("cardStorage");
            let allCards: HTMLDivElement[] = new Array(); 

            for (let i: number = 0; i < 8; i++) { 

                for (let index: number = 0; index < 2; index++) { 
                    let card: HTMLDivElement = document.createElement("div");

                    card.style.backgroundImage = "url('" + images[i]["url"] + "')";
                    card.classList.add("cards"); 
                    card.classList.add("turnAround");
                    card.classList.add("pair_" + i);                                                        //karten werden kenntlich gemacht welche zsm gehören

                    allCards.push(card);                                                                    //erstellte element Card (8stück) werden in allCards gespeichert.
                }
            }

            pairAmount = allCards.length / 2;

            allCards = shuffle(allCards);
            for (let i2: number = 0; i2 < allCards.length; i2++) { 
                cardStorage.appendChild(allCards[i2]);                                                      //alle 16 karten werden dem cardstorage hinzugefügt
            }

            let firstCard: string; 
            let secondCard: string;


            let selectedCard: HTMLCollectionOf<Element> = document.getElementsByClassName("cards");

            let clickCount: number = 0;

            for (let cardNum: number = 0; cardNum < selectedCard.length; cardNum++) {

                selectedCard[cardNum].addEventListener("click", selectCard); 
            }

            //Neuer Abschnitt: Karten anklicken
            function selectCard(this: HTMLDivElement, _e: Event): void { 
                if (!this.classList.contains("firstCard")) {
                    if (clickCount == 2) { 

                        firstCard = undefined;
                        secondCard = undefined;

                        clickCount = 0;
                    }

                    //this ist immer das aktuelle Element welches das Event/die Funktion ausgeführt hat, in diesem Fall selectCard
                    this.classList.remove("turnAround"); 
                    this.classList.add("turnForward");

                    if (!firstCard && !secondCard) {
                        firstCard = this.classList.item(1);                                                    //Die zweite Klasse "card_number" wird in firstCard gespeichert, deshslb item(1). Somit ist firstCard nicht mehr undefined. Die erste Klasse ist "cards"
                        this.classList.add("firstCard");
                    } else if (firstCard && !secondCard && !this.classList.contains("firstCard")) {            //damit man nciht 2x auf dei selbe karte klicken kann
                        let firstCards: HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("firstCard");

                        for (let x: number = 0; x < firstCards.length; x++) {
                            firstCards[x].classList.remove("firstCard");
                        }

                        secondCard = this.classList.item(1);
                    }

                    if (firstCard == secondCard) {
                        let pair: HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName(firstCard);

                        //https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window
                        setTimeout(function (): void { 
                            for (let i: number = 0; i < 2; i++) { 
                                pair[i].style.opacity = "0";
                                pair[i].style.pointerEvents = "none";
                                pair[i].classList.remove("cards"); //Klasse wird entfernt, sonst wird bei dem nächsten Aufruf von toggleCards die Karte wieder enabled
                            }
                        },         1000); 

                        if (pairAmount > 1) {
                            pairAmount--;
                        } else {
                    
                            clearInterval(interval);
                            let timeElement: HTMLSpanElement = document.getElementById("time");

                            
                            localStorage.setItem("mySeconds", timeElement.innerText.slice(0, -1)); //https://flaviocopes.com/how-to-remove-last-char-string-js/
                   
                            window.location.href = "myScore.html"; 
                            //https://www.w3schools.com/js/js_window_location.asp
                            
                        }
                    } else {
                        if (clickCount == 1) { //clickCount wird auf 1 geprüft, da er erst erhöht wird wenn die Funktion abgeschlossen ist. Somit befindet man sich gerade im zweiten Klick wenn clickCount = 1 ist. Es wurde bereits ein zweites Mal geklickt.

                            let turnedCards: HTMLCollectionOf<Element> = document.getElementsByClassName("turnForward");

                            for (let turned: number = 0; turned < turnedCards.length; turned++) { 

                                toggleCards(false); //toggleCards wird mit false aufegrufen, also disabled

                                setTimeout(function (): void {
                                    turnedCards[turned].classList.add("turnAround");
                                    toggleCards(true); //toggleCards wird mit true aufgerufen, also enabled
                                },         1000); 


                            }
                        }
                    }

                    clickCount++; 
                }
            }

        } else if (_case == "admin") {
            for (let image of await images) { 
                
                let outerContainer: HTMLDivElement = document.createElement("div"); 
                outerContainer.classList.add("outerElement");

                let dbCard: HTMLDivElement = document.createElement("div");
                dbCard.classList.add("cards");
                dbCard.style.backgroundImage = "url('" + image["url"] + "')";

                let deleteButton: HTMLDivElement = document.createElement("div");
                deleteButton.classList.add("deleteButton");
                deleteButton.addEventListener("click", function (): void { //https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
                    deleteImageFromDb(image["url"]);
                });



                let output: HTMLDivElement = <HTMLDivElement>document.getElementById("displayOutput");

                output.appendChild(outerContainer);
                outerContainer.appendChild(dbCard);
                outerContainer.appendChild(deleteButton);
            }
        }
    }


    // async function deleteImageFromDb(_pictureUrl: string): Promise<void> {
    //     let url: string = "https://gissose21.herokuapp.com/deletePicture?url=" + _pictureUrl;
    //     await fetch(url);
    // }


    function shuffle(_array: any): any {  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex: number = _array.length; 
        let randomIndex: number;
        
        while (0 !== currentIndex) { 

            randomIndex = Math.floor(Math.random() * currentIndex); 
            currentIndex--; 

            [_array[currentIndex], _array[randomIndex]] = [
                _array[randomIndex], _array[currentIndex]];
        }

        return _array;
    }


    function toggleCards(_status: boolean): void {
        let allCards: HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("cards");

        for (let cardIndex: number = 0; cardIndex < allCards.length; cardIndex++) {
            //status false = disabled, else enabled


            if (!_status) {
                allCards[cardIndex].style.pointerEvents = "none"; 
            } else {
                allCards[cardIndex].style.pointerEvents = "auto";
            }

        }
    }

    //https://www.codegrepper.com/code-examples/javascript/javascript+count+seconds
    function time(): void {

        if (document.getElementById("activePlay") != undefined) { //play.html
            let second: number = 0;
            let el: HTMLSpanElement = document.getElementById("time"); 


            function incrementSeconds(): void {
                second += 1;
                el.innerText = second + "s"; 
            }

            interval = setInterval(incrementSeconds, 1000); 


        }

    }

    document.addEventListener("DOMContentLoaded", function (_event: Event): void {  



        //play.html
        if ((document.querySelector("title").getAttribute("id") == "playPage")) {
            
            time(); 
            showPicture("play");
        }

        else if ((document.querySelector("body").getAttribute("id") == "bodyIndex")) {
            //https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
            window.onresize = removeCanvas;

            //https://stackoverflow.com/questions/34422052/how-to-detect-browser-has-gone-to-full-screen/35178632
            if (screen.width !== window.innerWidth) {
                removeCanvas();
            }

            function removeCanvas(): void {
                if (document.getElementById("myFirstCanvas")) {
                    document.getElementById("myFirstCanvas").remove();
                }

            }

        }

        //score.html
        else if (document.querySelector("title").getAttribute("id") == "scorePage") {

            async function showInfo(): Promise<void> {

                let formData: FormData = new FormData(document.forms[0]);
                let query: URLSearchParams = new URLSearchParams(<any>formData);
                let url: string = "https://gissose21.herokuapp.com/showInfo";
                url = url + "?" + query.toString();
                let answer: Response = await fetch(url);
                let scores: any = await answer.json();


                let sortedScores: any = new Array();

                for (let i: number = 0; i < scores.length; i++) {
                    sortedScores.push(new Array(parseInt(scores[i]["PlayerScore"]), scores[i]["PlayerName"]));
                }

                sortedScores.sort(sortFunction);

                function sortFunction(a: any, b: any): any {
                    if (a[0] === b[0]) {
                        return 0;
                    }
                    else {
                        return (a[0] < b[0]) ? -1 : 1;
                    }
                }

                for (let order: number = 0; order < sortedScores.length; order++) {
                    let playerPlacement: HTMLTableDataCellElement = document.querySelector("#row_" + order + " .playerPlacement");
                    let playerName: HTMLTableDataCellElement = document.querySelector("#row_" + order + " .playerName");
                    let playerTime: HTMLTableDataCellElement = document.querySelector("#row_" + order + " .playerTime");

                    playerPlacement.innerText = (order + 1).toString();
                    playerTime.innerText = sortedScores[order][0];
                    playerName.innerText = sortedScores[order][1];
                }
            }
            showInfo();

        }

        //myScore.html
        else if (document.querySelector("title").getAttribute("id") == "myScorePage") {

            let seconds: string = localStorage.getItem("mySeconds");
            document.getElementById("myTime").innerText = seconds + "s"; 

            document.getElementById("saveInfoButton").addEventListener("click", sendInfo); 

            async function sendInfo(): Promise<void> { 
                let formData: FormData = new FormData(document.forms[0]);

                let query: URLSearchParams = new URLSearchParams(<any>formData);

                if (query.toString() != "PlayerName=") { 
                    let url: string = "https://gissose21.herokuapp.com/sendInfo";
                    url += "?PlayerScore=" + seconds + "&" + query.toString(); 
                    let answer: Response = await fetch(url); 
                    await answer.text();

                    window.location.href = "score.html";
                
                }

            }
        }

        //admin.html
        else if (document.querySelector("title").getAttribute("id") == "adminPage") {

            document.getElementById("sendToDatabaseButton").addEventListener("click", sendPicture); 
            let messages: HTMLElement = document.getElementById("messages");

            async function sendPicture(): Promise<void> {
                let formData: FormData = new FormData(document.forms[0]);
                let query: URLSearchParams = new URLSearchParams(<any>formData);
                let url: string = "https://gissose21.herokuapp.com/sendPicture";
                url = url + "?" + query.toString();

                let urlSplit: string[] = query.toString().split("&"); 

                if (!urlSplit.includes("name=") && !urlSplit.includes("url=")) { 
                    let answer: Response = await fetch(url);
                    messages.innerHTML = ""; //https://plagiatus.github.io/GIS_SoSe2020/Aufgabe11/Client/
                    if (answer == undefined) { 
                        messages.innerHTML = "Image could not be saved.";
                    } else {
                        messages.innerHTML = "Image has been saved.";
                    }
                }

            }
            document.getElementById("showPictureButton").addEventListener("click", function (): void { //https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
                showPicture("admin");
            }); 


        }
    });
}