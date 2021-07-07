"use strict";
// <div class ="card" >
//     <img src="Images/cat1.jpg" alt = "Memory Logo" width = "150px" height = "150px" >
//         </div>
function shuffle(_array) {
    let currentIndex = _array.length; //2. das array it 16 karten, er nimmt die länge davon und erstelllt leere variable - randomIndex
    let randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) { //solange current index ungleich null ist wird folgendes passieren
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex); //erstellt randomindex zahl zwischen 1 und 16 und fängt mit 16 an. 
        currentIndex--; //reduziert es um 1, sonst wär while scheife unendlich
        // And swap it with the current element. array wird durchgegangen von 0, 1, 2.. und diese werden mit random zahlen ersetzt.
        [_array[currentIndex], _array[randomIndex]] = [
            _array[randomIndex], _array[currentIndex]
        ];
    }
    return _array;
}
document.addEventListener("DOMContentLoaded", function (event) {
    let cardStorage = document.getElementById("cardStorage");
    let allCards = new Array(); //leeres Array wo alle karten sein werden
    for (let i = 0; i < 8; i++) { //8kartenpaare 
        for (let index = 0; index < 2; index++) { //jede kartenpaar brauccht eine zweite karte
            let card = document.createElement("div"); //ein div eine karte
            card.classList.add("cards"); //div mit der kalsse cards
            card.classList.add("pair_" + i); //jede karte wir kenntlcih gemacht welche zsm gehören.
            allCards.push(card); //erstellte element Card (8stück) werden in allCards gespeichert.
        }
    }
    allCards = shuffle(allCards);
    for (let i2 = 0; i2 < allCards.length; i2++) { //allCardslength = 16
        cardStorage.appendChild(allCards[i2]); //alle 16 karten werden dem cardstorage hinzugefügt
    }
});
//# sourceMappingURL=main.js.map