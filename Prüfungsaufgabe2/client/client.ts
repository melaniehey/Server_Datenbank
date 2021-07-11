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
            let allCards: HTMLDivElement[] = new Array(); //leeres Array wo alle karten sein werde

            for (let i: number = 0; i < 8; i++) { //8kartenpaare 

                for (let index: number = 0; index < 2; index++) { //jede kartenpaar brauccht eine zweite karte
                    let card: HTMLDivElement = document.createElement("div"); //ein div eine karte

                    card.style.backgroundImage = "url('" + images[i]["url"] + "')";
                    card.classList.add("cards"); //div mit der kalsse cards
                    card.classList.add("turnAround");
                    card.classList.add("pair_" + i); //jede karte wir kenntlcih gemacht welche zsm gehören.

                    allCards.push(card); //erstellte element Card (8stück) werden in allCards gespeichert.
                }
            }

            pairAmount = allCards.length / 2;

            allCards = shuffle(allCards);
            for (let i2: number = 0; i2 < allCards.length; i2++) { //allCardslength = 16
                cardStorage.appendChild(allCards[i2]); //alle 16 karten werden dem cardstorage hinzugefügt
            }

            let firstCard: string; //Platzhalter für die erste Karte die angeklickt wird
            let secondCard: string;


            let selectedCard: HTMLCollectionOf<Element> = document.getElementsByClassName("cards");

            let clickCount: number = 0; //track wie viele Klicks gemacht wurden

            for (let cardNum: number = 0; cardNum < selectedCard.length; cardNum++) {

                selectedCard[cardNum].addEventListener("click", selectCard); //alle Karten durchgeloopt und bekommen einen ClickListener welcher die Funktion selectCard ausführt
            }

            //Neuer Abschnitt: Karten anklicken

            function selectCard(this: HTMLDivElement, _e: Event): void { //wird nach Klick auf Karte ausgeführt
                if (!this.classList.contains("firstCard")) {
                    if (clickCount == 2) { //als erstes wird der Klick überprüft, wenn 2 dann zurücksetzen also beim dritten Klick

                        firstCard = undefined;
                        secondCard = undefined;

                        clickCount = 0;
                    }

                    //this ist immer das aktuelle Element welches das Event/die Funktion ausgeführt hat, in diesem Fall selectCard
                    this.classList.remove("turnAround"); //Klassen werden geändert, da sich angeklickte Karte umdrehen soll. turnAround ist Standardposition. Wird benötigt für den Kartenhintergrund (CSS)
                    this.classList.add("turnForward");

                    if (!firstCard && !secondCard) {
                        firstCard = this.classList.item(1); //Die zweite Klasse "card_number" wird in firstCard gespeichert, deshslb item(1). Somit ist firstCard nicht mehr undefined. Die erste Klasse ist "cards"
                        this.classList.add("firstCard");
                    } else if (firstCard && !secondCard && !this.classList.contains("firstCard")) { //damit man nciht 2x auf dei selbe karte klicken kann
                        let firstCards: HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("firstCard");

                        for (let x: number = 0; x < firstCards.length; x++) {
                            firstCards[x].classList.remove("firstCard");
                        }

                        secondCard = this.classList.item(1);
                    }

                    if (firstCard == secondCard) {

                        //Beide Karten des Paares werden rausgesucht an Hand der eingespeicherten Klasse, entweder in firstCard oder secondCard weil es die selbe "card_number" Klasse zugehörig ist.
                        let pair: HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName(firstCard);

                        //https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window
                        setTimeout(function (): void { //Alles was IN (NICHT NACH) setTimout steht wird Zeit verzögert ausgeführt
                            for (let i: number = 0; i < 2; i++) { //2 wegen Paarlänge, könnte auch pair.length sein
                                pair[i].style.opacity = "0";
                                pair[i].style.pointerEvents = "none";
                                pair[i].classList.remove("cards"); //Klasse wird entfernt, sonst wird bei dem nächsten Aufruf von toggleCards die Karte wieder enabled
                            }
                        },         1000); //Timeout mit einer Sekunde

                        if (pairAmount > 1) {
                            pairAmount--;
                        } else {
                            // console.log("Fertig, timer ende, spiel vorbei");
                            clearInterval(interval);
                            let timeElement: HTMLSpanElement = document.getElementById("time");

                            //LocalStorage
                            localStorage.setItem("mySeconds", timeElement.innerText.slice(0, -1)); //https://flaviocopes.com/how-to-remove-last-char-string-js/
                            //entfernen den letzten char weil das immer ein "s" ist und wir dieses nicht benötigen -> spätere Umwandlung in Integer

                            //wird in Console ausgegeben
                            //---------
                            window.location.href = "myScore.html"; //weiterleitung auf score.html 
                            //https://www.w3schools.com/js/js_window_location.asp
                            //oder https-Adresse??????
                            //ScorePage ÄNDERN - auf Seite 5 (zwischendrin)
                            //-----------


                        }
                    } else {
                        if (clickCount == 1) { //clickCount wird auf 1 geprüft, da er erst erhöht wird wenn die Funktion abgeschlossen ist. Somit befindet man sich gerade im zweiten Klick wenn clickCount = 1 ist. Es wurde bereits ein zweites Mal geklickt.

                            let turnedCards: HTMLCollectionOf<Element> = document.getElementsByClassName("turnForward");

                            for (let turned: number = 0; turned < turnedCards.length; turned++) { //Sind eigentlich immer nur 2. Sollt etwas schief gehen werden trotzdem alle vorwärts gedrehten Karten für den Loop verwendet.

                                toggleCards(false); //toggleCards wird mit false aufegrufen, also disabled

                                setTimeout(function (): void {
                                    turnedCards[turned].classList.add("turnAround");
                                    toggleCards(true); //toggleCards wird mit true aufgerufen, also enabled
                                },         1000); //Timeout, damit man sieht welche Karte man gewählt hat bevor sie sich wieder umdreht


                            }
                        }
                    }

                    clickCount++; //Ende der Funktion, daher wird Clickcount erhöht
                }
            }

        } else if (_case == "admin") {
            for (let image of await images) { //Wird durch das Arry images geloopt und jedes Element von images wird als image verwendet
                //loopen durch alle Bilder aus der Datenbank und erstellen dynamisch dazu das HTML
                let outerContainer: HTMLDivElement = document.createElement("div"); //Container für Karten aus Datenbank
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


    async function deleteImageFromDb(_pictureUrl: string): Promise<void> {
        // let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        // let query: URLSearchParams = new URLSearchParams(<any>formData);
        let url: string = "https://gissose21.herokuapp.com/deletePicture?url=" + _pictureUrl;
        //url = url + "?" + query.toString();
        await fetch(url);
    }


    function shuffle(_array: any): any {  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex: number = _array.length; //2. das array it 16 karten, er nimmt die länge davon und erstelllt leere variable - randomIndex
        let randomIndex: number;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) { //solange current index ungleich null ist wird folgendes passieren

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex); //erstellt randomindex zahl zwischen 1 und 16 und fängt mit 16 an. 
            currentIndex--; //reduziert es um 1, sonst wär while scheife unendlich

            // And swap it with the current element. array wird durchgegangen von 0, 1, 2.. und diese werden mit random zahlen ersetzt.
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
                allCards[cardIndex].style.pointerEvents = "none"; //pointerEvents steuert klickbarkeit der Karten. In dem Fall NICHT klickbar
            } else {
                allCards[cardIndex].style.pointerEvents = "auto";
            }

        }
    }

    //https://www.codegrepper.com/code-examples/javascript/javascript+count+seconds
    function time(): void {

        if (document.getElementById("activePlay") != undefined) { //wird nur ausgeführt wenn es activplay id gibt/definiert ist (Nur im play.htmk)
            let second: number = 0;
            let el: HTMLSpanElement = document.getElementById("time"); //holt sich das HTML Element mit der ID time


            function incrementSeconds(): void {
                second += 1;
                el.innerText = second + "s"; //das muss in den localStorage
            }

            interval = setInterval(incrementSeconds, 1000); //interval löst Funktion mehrmals aus mit Zeitangabe in Milisekunden, 1000 millisekunden = 1 sekunde


        }

    }

    document.addEventListener("DOMContentLoaded", function (_event: Event): void {  //1. warten bis domElement (Div) geladen aht um alles zu verwennden 



        //play.html
        if ((document.querySelector("title").getAttribute("id") == "playPage")) {//die ID von dem Title kann hier erst geladen werden da zu einem früheren Zeitpunkt der Inhalt der Seite noch nicht geladen wurde
            //siehe DOMContentLoaded

            time(); //time wird am Anfang aufgerufen da zu Spielbeginn die Zeit laufen soll 
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
            //kein Button, nur Ausgabe der Highscores


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
            // displayANTWORt.innerHTML = "Du hast " + localStorage.getItem("mySeconds") + "gebraucht.";  //mit id im html verbinden
            showInfo();

        }

        //myScore.html
        else if (document.querySelector("title").getAttribute("id") == "myScorePage") {

            let seconds: string = localStorage.getItem("mySeconds");
            document.getElementById("myTime").innerText = seconds + "s"; //gibt die Zeit mit "s" in der myScore HTML Seite aus

            document.getElementById("saveInfoButton").addEventListener("click", sendInfo);  //Send Info = Send Name & Time

            async function sendInfo(): Promise<void> { //function an den server
                let formData: FormData = new FormData(document.forms[0]); //Hiervon bekomme ich den NAMEN! Formular. Wie ein Array mit Key und Value. //Dieses Array wird wieder in Array gespeichert, nähmlich document.forms. 

                let query: URLSearchParams = new URLSearchParams(<any>formData);

                if (query.toString() != "PlayerName=") { //PlayerName= bedeuetet Input leer, wenn nicht leer ist geht die Funktion weiter
                    let url: string = "https://gissose21.herokuapp.com/sendInfo"; //Es gibt nur 1 Folmular, also [0]
                    url += "?PlayerScore=" + seconds + "&" + query.toString(); //Hiervon bekomme ich die ZEIT! + name (name == query.toString()) //das wird alles im link ausgegeben
                    let answer: Response = await fetch(url); //mit fetch schick ich es an den server mit der URL
                    await answer.text();

                    window.location.href = "score.html";
                    //an server geschickt
                }

            }
        }

        //admin.html
        else if (document.querySelector("title").getAttribute("id") == "adminPage") {

            document.getElementById("sendToDatabaseButton").addEventListener("click", sendPicture); //Bilder speichern
            let messages: HTMLElement = document.getElementById("messages");

            async function sendPicture(): Promise<void> {
                let formData: FormData = new FormData(document.forms[0]);
                let query: URLSearchParams = new URLSearchParams(<any>formData);
                let url: string = "https://gissose21.herokuapp.com/sendPicture";
                url = url + "?" + query.toString();

                let urlSplit: string[] = query.toString().split("&"); //split "spaltet" einen String an dem definierten string, in dem Fall "&", und speichert alle substrings in einem Array

                if (!urlSplit.includes("name=") && !urlSplit.includes("url=")) { //wenn weder name= oder url= Bestandteil des Arrays sind dann mach weiter
                    let answer: Response = await fetch(url);
                    messages.innerHTML = ""; //Text wird zurückgesetzt, so dass neuer Text ausgegeben kanns //LUKAS: https://plagiatus.github.io/GIS_SoSe2020/Aufgabe11/Client/
                    if (answer == undefined) { //es fragt, gibt es eine RESPONSE oder nicht -> server.ts --> _response.end();
                        messages.innerHTML = "Image could not be saved.";
                    } else {
                        messages.innerHTML = "Image has been saved.";
                    }
                }

            }
            document.getElementById("showPictureButton").addEventListener("click", function (): void { //https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
                showPicture("admin");
            }); //Bilder ansehen


        }
    });
}