// <div class ="card" >
//     <img src="Images/cat1.jpg" alt = "Memory Logo" width = "150px" height = "150px" >
//         </div>

namespace Prüfungsabgabe {

    //play.html
    if ((document.querySelector("title").getAttribute("id") == "playPage")) {

        function shuffle(_array: HTMLDivElement[]): HTMLDivElement[] {  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

        let interval: any;

        //https://www.codegrepper.com/code-examples/javascript/javascript+count+seconds
        function time(): void {

            if ( document.getElementById("activePlay") != undefined ) { //wird nur ausgeführt wenn es activplay id gibt (Nur im play.htmk)
                let second: number = 0;
                let el: HTMLSpanElement = document.getElementById("time"); //holt sich das HTML Element mit der ID time


                function incrementSeconds(): void {
                    second += 1;
                    el.innerText = second + "s"; //das muss in den localStorage
                }

                interval = setInterval(incrementSeconds, 1000); //interval löst Funktion mehrmals aus mit Zeitangabe in Milisekunden, 1000 millisekunden = 1 sekunde


                //LocalStorage
                localStorage.setItem("mySeconds", el.innerText);

                console.log(localStorage.getItem("mySeconds")); //wird in Console ausgegeben

            }

        }

        document.addEventListener("DOMContentLoaded", function (_event: Event): void {  //1. warten bis domElement (Div) geladen aht um alles zu verwennden 
            time(); //time wird am Anfang aufgerufen da zu Spielbeginn die Zeit laufen soll 
            let cardStorage: HTMLDivElement = <HTMLDivElement>document.getElementById("cardStorage");
            let allCards: HTMLDivElement[] = new Array(); //leeres Array wo alle karten sein werden
            for (let i: number = 0; i < 8; i++) { //8kartenpaare 

                for (let index: number = 0; index < 2; index++) { //jede kartenpaar brauccht eine zweite karte
                    let card: HTMLDivElement = document.createElement("div"); //ein div eine karte
                    card.classList.add("cards"); //div mit der kalsse cards
                    card.classList.add("turnAround");
                    card.classList.add("pair_" + i); //jede karte wir kenntlcih gemacht welche zsm gehören.
                    allCards.push(card); //erstellte element Card (8stück) werden in allCards gespeichert.
                }
            }

            let pairAmount: number = allCards.length / 2;

            allCards = shuffle(allCards);
            for (let i2: number = 0; i2 < allCards.length; i2++) { //allCardslength = 16
                cardStorage.appendChild(allCards[i2]); //alle 16 karten werden dem cardstorage hinzugefügt
            }

            //Neuer Abschnitt: Karten anklicken
            let selectedCard: HTMLCollectionOf<Element> = document.getElementsByClassName("cards");
            let firstCard: string; //Platzhalter für die erste Karte die angeklickt wird
            let secondCard: string;

            let clickCount: number = 0; //track wie viele Klicks gemacht wurden

            for (let cardNum: number = 0; cardNum < selectedCard.length; cardNum++) {
                selectedCard[cardNum].addEventListener("click", selectCard); //alle Karten durchgeloopt und bekommen einen ClickListener welcher die Funktion selectCard ausführt
            }

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
                        }, 1000); //Timeout mit einer Sekunde

                        if (pairAmount > 1) {
                            pairAmount--;
                        } else {
                            // console.log("Fertig, timer ende, spiel vorbei");
                            clearInterval(interval);
                            let timeElement: HTMLSpanElement = document.getElementById("time");
                            console.log(timeElement.innerText);
                            //---------
                            window.location.href = "../myScore.html"; //weiterleitung auf score.html 
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
                                }, 1000); //Timeout, damit man sieht welche Karte man gewählt hat bevor sie sich wieder umdreht


                            }
                        }
                    }

                    clickCount++; //Ende der Funktion, daher wird Clickcount erhöht
                }
            });



    }


    //score.html
    else if ((document.querySelector("title").getAttribute("id") == "scorePage")) {
        //kein Button, nur Ausgabe der Highscores

        async function getInfo(): Promise<void> {

        }

    }

    //myScore.html
    else if ((document.querySelector("title").getAttribute("id") == "myScorePage")) {
        document.getElementById("saveInfoButton").addEventListener("click", sendInfo);  //Send Info = Send Name & Time

        async function sendInfo(): Promise<void> { //function an den server
            let formData: FormData = new FormData(document.forms[0]); //Hiervon bekomme ich den NAMEN! Formular. Wie ein Array mit Key und Value. //Dieses Array wird wieder in Array gespeichert, nähmlich document.forms. 
            //tslint:disable-next-line: no-any
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            let url: string = "https://gissose21.herokuapp.com/sendInfo"; //Es gibt nur 1 Folmular, also [0]
            url += "?PlayerScore=" + localStorage.getItem("mySeconds") + "&" + query.toString(); //Hiervon bekomme ich die ZEIT!
            let answer: Response = await fetch(url); //mit fetch schick ich es an den server mit der URL
            let output: string = await answer.text();
            console.log(output);  //an server geschickt
        }
    }

    //admin.html
    else if ((document.querySelector("title").getAttribute("id") == "adminPage")) {
        document.getElementById("showPictures").addEventListener("click", add);

        async function add(): Promise<void> {

        }
    }


}