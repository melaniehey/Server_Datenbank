"use strict";
var Prüfungsaufgabe;
(function (Prüfungsaufgabe) {
    window.addEventListener("load", () => {
        let canvas = document.getElementById("myFirstCanvas");
        if (canvas) {
            let context = canvas.getContext("2d");
            canvas.height = 800;
            canvas.width = window.innerWidth;
            //Oben
            context.beginPath();
            context.moveTo(447, 160);
            context.lineTo(500, 0);
            context.lineTo(1536, 0);
            context.lineTo(1536, 350);
            context.lineTo(994, 428);
            context.lineTo(994, 285);
            context.lineTo(1092, 285);
            context.lineTo(1092, 160);
            context.lineTo(447, 158);
            context.fill();
            context.strokeStyle = "black";
            context.stroke();
            context.beginPath();
            context.moveTo(994, 302);
            context.lineTo(543, 302);
            context.lineTo(556, 284);
            context.lineTo(748, 284);
            context.lineTo(748, 159);
            context.lineTo(790, 159);
            context.lineTo(790, 285);
            context.lineTo(994, 285);
            context.lineTo(994, 302);
            context.fill();
            context.stroke();
            //Unten - geht nicht weil canvas übre den buttons liegt.
            //Bevor das funktioniert muss die canvas.height größer gestellt werden.
            context.beginPath();
            context.moveTo(499, 587);
            context.lineTo(600, 721);
            context.lineTo(1536, 721);
            context.lineTo(1536, 630);
            context.lineTo(1027, 548);
            context.lineTo(1027, 587);
            context.lineTo(865, 587);
            context.lineTo(865, 557);
            context.lineTo(844, 548);
            context.lineTo(844, 587);
            context.lineTo(682, 587);
            context.lineTo(682, 557);
            context.lineTo(660, 548);
            context.lineTo(660, 587);
            context.lineTo(499, 587);
            context.fill();
            context.stroke();
        }
    });
})(Prüfungsaufgabe || (Prüfungsaufgabe = {}));
//# sourceMappingURL=canvas.js.map