/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = UITLEG;

var spelerX = 63; // x-positie van speler.
var spelerY = 615; // y-positie van speler.
var spelerWidth = 40; // breedte van speler.
var spelerHeight = 65; // hoogte van speler.

var score = 0; // de score.
var highscore = 0; // de hoogst score behaald.
var afstand = 0; // de afstand, hiervan is de score afhankelijk.

var maxJumpHeight = 0; // de maximale hoogte tot waar je kan springen.
var jumpSpeed = 4; // de snelheid waarmee je omhoog gaat.
var valStatus = false; // geeft aan of je valt.
var springStatus = false; // geeft aan of je soringt.
var groundHeight = 615; // de hoogte waarop de speler staat.

var bukStatus = false; // geeft aan of de speler bukt.

var blokX = [1280, 1600, 2060]; // de x-coördinaten van de blokken.
var blokY = [0, 0, 0]; // de y-coördinaten van de blokken.
var blokSpeed = 5.025; // de snelheid waarmee het blok beweegt.
var blokWidth = [0, 0, 0]; // de breedte van de blokken.
var blokHeight = [0, 0, 0]; // de hoogte van de blokken.
var blokAfmetingPool = [70, 140, 210, 280]; // waardes die de hoogte en de breedte van de blokken kunnen zijn.

var afstandBlok0; //afstand van het eerste blok tot de speler.
var afstandBlok1; //afstand van het tweede blok tot de speler.
var afstandBlok2; //afstand van het derde blok tot de speler.
var actiefBlok; // het blok dat het dichtsbij de speler is. Hiermee zorg ik ervoor dat een bepaald stukje code goed loopt.

var controlScherm = false; // bepaalt of het scherm met de controles van het spel moet worden getekend of niet.

//met de volgende twee variabelen zorg ik ervoor dat je maar een output krijgt als de muis wordt ingedrukt.
var mouseIsClicked = false; // of de muis is geklikt.
var mouseWasClicked = false; // of de muis was geklikt.

// de volgende variabelen zijn de afbeeldingen
var imgJack = 0;
var imgJackSlide = 0;
var imgBackground = 0;
var imgGroundLinksBoven = 0;
var imgGroundMiddenBoven = 0;
var imgGroundRechtsBoven = 0;
var imgGroundLinksOnder = 0;
var imgGroundMiddenOnder = 0;
var imgGroundRechtsOnder = 0;
var imgGroundLinksMidden = 0;
var imgGroundRechtsMidden = 0;
var imgGroundMidden = 0;
var imgGroundSingleTileVerticaalBoven = 0;
var imgGroundSingleTileVerticaalMidden = 0;
var imgGroundSingleTileVerticaalOnder = 0;
var imgGroundSingleTile = 0;
var imgGroundSingleTileHorizontaalLinks = 0;
var imgGroundSingleTileHorizontaalMidden = 0;
var imgGroundSingleTileHorizontaalRechts = 0;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
    image(imgBackground, 0, 0, width, height);
};


/**
 * Tekent de blokken
 */
var tekenBlokje = function() {
    fill("red");
    for (var i = 0; i < 3; i = i + 1) { // zodat de code voor alle drie de blokken wordt uitgevoerd
        for (var k = 0; k < blokWidth[i]; k = k + 70) { // deze gigantische for-loop met absurd veel if-jes zorgt er voor dat ieder blokje de juiste graphics heeft.
            for(var l = 0; l < blokHeight[i]; l = l + 70) {
                if(k === 0 && k + 70 === blokWidth[i] && l === 0 && l + 70 === blokHeight[i]) { // blokje van 70 × 70.
                    image(imgGroundSingleTile, blokX[i], blokY[i], 70, 70);
                } else if (k === 0 && k + 70 === blokWidth[i]) { // blokje van 70 × n met n is niet 70.
                    if(l === 0) { // bovenste deel
                        image(imgGroundSingleTileVerticaalBoven, blokX[i], blokY[i] + l + 1, 70, 70);
                    } else if (l + 70 === blokHeight[i]) { // onderste deel
                        image(imgGroundSingleTileVerticaalOnder, blokX[i], blokY[i] + l + 1, 70, 70);
                    } else { // overig deel in hoogte
                        image(imgGroundSingleTileVerticaalMidden, blokX[i], blokY[i] + l + 1, 70, 70);
                    }
                } else if (l === 0 && l + 70 === blokHeight[i]) {// blokje van n × 70 met n is niet 70. 
                    if (k === 0) { // linker deel
                        image(imgGroundSingleTileHorizontaalLinks, blokX[i] + k + 1, blokY[i], 70, 70);
                    } else if (k + 70 === blokWidth[i]) { // rechter deel
                        image(imgGroundSingleTileHorizontaalRechts, blokX[i] + k + 1, blokY[i], 70, 70);
                    } else { // overig deel in breedte
                        image(imgGroundSingleTileHorizontaalMidden, blokX[i] + k + 1, blokY[i], 70, 70);
                    }
                } else { // overige blokjes
                    if (k === 0) { // linker deel
                        if(l === 0) { // bovenste deel
                            image(imgGroundLinksBoven, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        } else if (l + 70 === blokHeight[i]) { // onderste deel
                            image(imgGroundLinksOnder, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        } else { // overig deel in hoogte
                            image(imgGroundLinksMidden, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        }
                    } else if (k + 70 === blokWidth[i]) { // rechter deel
                        if(l === 0) { // bovenste deel
                            image(imgGroundRechtsBoven, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        } else if (l + 70 === blokHeight[i]) { // onderste deel
                            image(imgGroundRechtsOnder, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        } else { // overig deel in hoogte
                            image(imgGroundRechtsMidden, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        }
                    } else { // overig deel in breedte
                        if(l === 0) { // bovenste deel
                            image(imgGroundMiddenBoven, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        } else if (l + 70 === blokHeight[i]) { // onderste deel
                            image(imgGroundMiddenOnder, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        } else { // overig deel in hoogte
                            image(imgGroundMidden, blokX[i] + k + 1, blokY[i] + l + 1, 70, 70);
                        }
                    }
                }
            }
        }
        if ((spelerX + spelerWidth >= blokX[actiefBlok] && spelerX + spelerWidth <= blokX[actiefBlok] + blokWidth[actiefBlok]) || (spelerX >= blokX[actiefBlok] && spelerX <= blokX[actiefBlok] + blokWidth[actiefBlok])) { // zorgt er voor dat je kan landen op een blok. Ik moest hier actief blok gebruiken, omdat er anders alleen naar de waardes van het derde blok werd gekeken.
            if (spelerY + spelerHeight <= blokY[actiefBlok] && bukStatus === false) {
                groundHeight = blokY[actiefBlok] - spelerHeight;
            } else if (spelerY + spelerHeight + 35 <= blokY[actiefBlok] && bukStatus === true) {
                groundHeight = blokY[actiefBlok] - (spelerHeight + 35);
            }
        } else { // reset de hoogte waar je kan staan als je niet meer boven een blok zit.
            groundHeight = 615;
        }
        if (blokX[i] < -350) { // zorgt er voor dat het blok terugkomt met nieuwe afmetingen en een nieuwe y-coördinaat, als het blok van het scherm af is.
            blokX[i] = 1280;
            blokY[i] = round(random(450, 600));
            blokWidth[i] = blokAfmetingPool[round(random(-0.5, 3.5))]; // gaat van 0.5 tot 3.5 zodat alle mogelijke waardes (0-3) kunnen worden gekozen.
            blokHeight[i] = blokAfmetingPool[round(random(-0.5, 2.5))]; // deze gaat tot 2.5 zodat de blokken niet te hoog om overheen te springen kunnen worden .
            while (blokY[i] + blokHeight[i] > 680) { // zorgt er voor dat een blok een nieuwe hoogte krijgt, als die een hoogte had waarmee die onder de grond uitkwam.
                blokHeight[i] = blokAfmetingPool[round(random(-0.5, 1.5))];
            }
        }
    }
};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  if (bukStatus === false) { // tekent de speler als die niet bukt.
        spelerWidth = 35;
        spelerHeight = 65;
        fill("white");
        image(imgJack, x - 15, y - 5, 70, 70);
  }
  if (bukStatus === true) { // tekent de speler als die bukt.
        spelerWidth = 65;
        spelerHeight = 45;
        fill("white");
        image(imgJackSlide, x, y + 5, 70, 70);
  }
};


/**
 * Updatet globale variabelen met positie van blok
 */
var beweegBlokje = function() {
    for (var i = 0; i < 3; i = i + 1) {
        blokX[i] = blokX[i] - blokSpeed;
    }
};


/**
 * Kijkt wat de toetsen doen.
 * Updatet globale variabele spelerY
 */
var beweegSpeler = function() {
    if (springStatus === false) { // zodat maxJumpHeight alleen veranderd wordt als de speler op de grond staat.
        maxJumpHeight = spelerY - 270;
    }
    if (keyIsDown(32) && springStatus === false && valStatus === false) { //als spatie wordt gedrukt springt de speler. Het zorgt er ook voor dat je niet kan springen in de lucht.
        springStatus = true;
    } 
    if (springStatus === true) {
        spelerY = spelerY - Math.pow(jumpSpeed, 2); //speler springt. Hoe hoger hoe trager.
        jumpSpeed = jumpSpeed - 0.075;
    }
    if (spelerY <= maxJumpHeight || (spelerY < groundHeight && springStatus === false)) { 
        valStatus = true; // zodat de speler valt.
        springStatus = false; // zodat de speler niet de atmosfeer in vliegt.
    }
    if (valStatus === true && spelerY < groundHeight) { //speler valt. Hoe lager hoe sneller.
        spelerY = spelerY + Math.pow(jumpSpeed, 2); 
        jumpSpeed = jumpSpeed + 0.075; 
    }
    if (spelerY >= groundHeight) { 
        valStatus = false; // zodat de speler niet door de grond valt.
        jumpSpeed = 4; // zodat de speler de volgende keer niet met een net verkeerde springsnelheid springt.
        spelerY = groundHeight; // zodat de speler altijd op de beginplaats terugkomt en niet op een net verkeerde.
    }
    
    if (keyIsDown(16) && springStatus === false && valStatus === false) { // als je op shift drukt bukt de speler. Het zorgt er ook voor dat je niet tijdens het springen kan bukken.
        bukStatus = true;
        if (blokSpeed > 0) { //vertraagt de speler tijdens het bukken. Hierdoor is het meer een slide.
            blokSpeed = blokSpeed - 0.075;
        }
    } else { // zorgt er voor dat de speler niet bukt als je niet op shift drukt.
        bukStatus = false;
        if (blokSpeed < 5.025) { // versnelt de speler weer, als die klaar is met bukken.
            blokSpeed = blokSpeed + 0.075;
        }
    }
}


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    for (var i = 0; i < 3; i = i + 1) {
         if (bukStatus === false && (spelerX - blokX[i] <= blokWidth[i] && blokX[i] - spelerX <= spelerWidth  && spelerY - blokY[i] <= blokHeight[i] - 1 && blokY[i] - spelerY <= spelerHeight - 1)){ // als dit waar is, dan raken de speler en het blokje elkaar in het geval dat de speler niet bukt. Er staat spelerHeight - 1, omdat je anders af zou gaan als je op het blok landt.
            return true;
        }
        if (bukStatus === true && (spelerX - blokX[i] <= blokWidth[i] && blokX[i] - spelerX <= spelerWidth  && spelerY + 20 - blokY[i] <= blokHeight[i] - 1 && blokY[i] - spelerY + 20 <= spelerHeight - 1)){ // als dit waar is, dan raken de speler en het blokje elkaar in het geval dat de speler bukt.
            return true;
        }
    }
};

 
/**
 * Berekent de punten
 */
var berekenPunten = function () {
    score = round(afstand);
    return score;
}


/**
 * Reset de waardes van bepaalde varaibelen, zodat de game de volgende keer goed start
 */
var gameReset = function () {
    spelerY = 615;
    score = 0;
    afstand = 0;
    jumpSpeed = 4;
    valStatus = false;
    springStatus = false;
    groundHeight = 615;
    bukStatus = false;
    controlScherm = false;
    blokSpeed = 5.025;
    for (var i = 0; i < 3; i = i + 1) { // zort er voor dat ieder blokje verschillende waardes heeft.
        if (i === 0) {
            blokX[i] = 1280;
        } else if (i === 1) {
            blokX[i] = 1600;
        } else if (i === 2) {
            blokX[i] = 2060;
        }
        blokY[i] = round(random(450, 600));
        blokWidth[i] = blokAfmetingPool[round(random(-0.5, 3.5))]; // gaat van 0.5 tot 3.5 zodat alle mogelijke waardes (0-3) kunnen worden gekozen.
        blokHeight[i] = blokAfmetingPool[round(random(-0.5, 2.5))]; // deze gaat tot 2.5 zodat de blokken niet te hoog om overheen te springen kunnen worden .
        while (blokY[i] + blokHeight[i] > 680) { // zorgt er voor dat een blok een nieuwe hoogte krijgt, als die een hoogte had waarmee die onder de grond uitkwam.
            blokHeight[i] = blokAfmetingPool[round(random(-0.5, 1.5))];
        }
    }
}


/**
 * Tekent het verliesscherm
 */
var tekenVerliesScherm = function () {
    image(imgBackground, 0, 0, width, height);
    fill('black');
    textSize(80);
    text('YOU LOST', 440, 350)
    textSize(30);
    text('Score:' + score, 450, 400);
    text('Highscore:' + highscore, 680, 400);
    var buttonText = ['restart', 'main menu'] 
    for (var i = 0; i < 2; i = i + 1) {
        fill('black');
        textSize(40);
        text(buttonText[i], 230 * i + 450 , 477);
        if (mouseX > 270 * i + 380 && mouseX < 270 * i + 630 && mouseY > 415 && mouseY < 515) { // zorgt ervoor dat de inhoud van de knop een beetje donkerder wordt als je er met je muis boven zit.
           fill("rgba(0, 0, 0, 0.2)"); 
        } else {
            noFill();
        }
        rect(270 * i + 380, 415, 250, 100);
    }
}


/**
 * start het spel
 */
var checkStart = function () {
    if (mouseX > 380 && mouseX < 630 && mouseY > 415 && mouseY < 515 && mouseIsClicked === true) {
        gameReset();
        return true;
    }
}


/**
 * Tekent het beginscherm
 */
var tekenHomeScreen = function () {
    image(imgBackground, 0, 0, width, height);
    fill('rgb(255, 127, 0)'); // de kleur is oranje
    textSize(80);
    text('Jumpin\' Jack', 410, 100)
    fill('black');
    textSize(30);
    if (highscore > 0) {
        text('Highscore:' + highscore, 560, 400)
    }
    var buttonText = ['play', 'controls'] 
    for (var i = 0; i < 2; i = i + 1) {
        fill('black');
        textSize(40);
        text(buttonText[i], 230 * i + 470 , 477);
        if (mouseX > 270 * i + 380 && mouseX < 270 * i + 630 && mouseY > 415 && mouseY < 515) { // zorgt ervoor dat de inhoud van de knop een beetje donkerder wordt als je er met je muis boven zit.
            fill("rgba(0, 0, 0, 0.2)"); 
        } else {
            noFill();
        }
        rect(270 * i + 380, 415, 250, 100);
    }
} 


/**
 * Controleert of er een nieuwe highscore is en geeft die door
 */
var checkNewHighscore = function () {
    if (score > highscore) {
        highscore = score;
    }
}


/**
 * Controleert of het scherm met de contoles van het spel getekend moet worden en tekent het als het moet.
 */
var checkControls = function () {
    if (mouseX > 650 && mouseX < 900 && mouseY > 415 && mouseY < 515 && mouseIsClicked === true && spelStatus === UITLEG) { // als je op de knop klikt wordt het scherm met de controles getekend.
        controlScherm = true;
    }
    if (controlScherm === true) {
        if (mouseX > 1137 && mouseX < 1150 && mouseY > 250 && mouseY < 265) { // als je boven het kruisje van het venster zit met je muis, wordt die rood.
            fill('red');
            rect(1137, 250, 14, 14);
            if (mouseIsClicked === true) { // als je op het kruisje klikt, gaat het venster weg.
                controlScherm = false;
            }
        }
        noFill();
        rect(1000, 250, 150, 90);
        line(1000, 265, 1150, 265)
        line(1137, 250, 1137, 265)
        fill('black');
        textSize(16);
        text('Controls', 1003, 263)
        textSize(18);
        text('Jump = Spacebar', 1003, 290)
        text('Slide = Shift', 1003, 320)
        text('x', 1140, 262)
    }
}


/**
 * Controleert of je naar het beginscherm gaat
 */
var checkMainMenu = function () {
    if (mouseX > 650 && mouseX < 900 && mouseY > 415 && mouseY < 665 && mouseIsClicked === true && spelStatus === GAMEOVER) { // als je op de knop klikt ga je naar het beginscherm
        return true;
    }
}


/**
 * Zorgt ervoor dat je een enkele output krijgt bij het klikken
 * Was nodig zodat als je op een knop drukte en daardoor naar een ander scherm ging, je niet meteen ook daar op een knop drukt
 */
var checkMouseIsClicked = function () {
    if(mouseIsPressed && mouseIsClicked === false && mouseWasClicked === false) { // als de muis net wordt ingedrukt, wordt dat doorgegeven.
        mouseIsClicked = true;
    } else if (mouseIsPressed) { // als de muis langer dan een input (0,02 secondes) wordt ingedrukt, wordt er doorgegeven dat de muis niet meer een output mag geven.
        mouseIsClicked = false;
        mouseWasClicked = true;
    } else { // als de muis niet meer is ingedrukt, wordt dat doorgegeven. Er moest hier trouwens 'mouseIsClicked = false;' staan, omdat het anders niet werkte en ik weet niet helemaal waarom.
        mouseIsClicked = false;
        mouseWasClicked = false;
    }
}


/**
 * Kijkt welk blok het dichtsbij de speler is en maakt dit het actieve blok
 * ik wou deze code compacter maken maar dan had ik een formule nodig die bij input: 1 output: 2 gaf, bij input: 2 output: 3 gaf en bij input: 3 output: 1 gaf.
 * ik had het een beetje korter kunnen maken, maar dan staat er een kort for-loop-je in de code en het maakt de code nog onduidelijker
 */
var checkBlokDichtstbij = function() {
    afstandBlok0 = blokX[0] - (spelerX + spelerWidth);
    afstandBlok1 = blokX[1] - (spelerX + spelerWidth);
    afstandBlok2 = blokX[2] - (spelerX + spelerWidth);
    if ((afstandBlok0 < afstandBlok1 || afstandBlok1 < -1 * (blokWidth[1] + spelerWidth)) && (afstandBlok0 < afstandBlok2 || afstandBlok2 < -1 * (blokWidth[2] + spelerWidth)) && afstandBlok0 >= -1 * (blokWidth[0] + spelerWidth)) { // als blok 1 het dichtstbij en niet voorbij de speler is, wordt dat het actieve blok. Ook gebeurt dit als de blokken voor dit voorbij de speler zijn.
        actiefBlok = 0;
    }
    if ((afstandBlok1 < afstandBlok0 || afstandBlok0 < -1 * (blokWidth[0] + spelerWidth)) && (afstandBlok1 < afstandBlok2 || afstandBlok2 < -1 * (blokWidth[2] + spelerWidth)) && afstandBlok1 >= -1 * (blokWidth[1] + spelerWidth)) { // als blok 1 het dichtstbij en niet voorbij de speler is, wordt dat het actieve blok. Ook gebeurt dit als de blokken voor dit voorbij de speler zijn.
        actiefBlok = 1;
    }
    if ((afstandBlok2 < afstandBlok0 || afstandBlok0 < -1 * (blokWidth[0] + spelerWidth)) && (afstandBlok2 < afstandBlok1 || afstandBlok1 < -1 * (blokWidth[1] + spelerWidth)) && afstandBlok2 >= -1 * (blokWidth[2] + spelerWidth)) { // als blok 1 het dichtstbij en niet voorbij de speler is, wordt dat het actieve blok. Ook gebeurt dit als de blokken voor dit voorbij de speler zijn.
        actiefBlok = 2;
    }
}


/**
 * preload
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, voordat het spel geladen is in de browser
 * in dit geval gebruikt om alle afbeeldingen te laden
 */
function preload() {
    imgJack = loadImage('./images/jack_staan.gif');
    imgJackSlide = loadImage('./images/jack_slide.gif');
    imgBackground = loadImage('./images/background.gif');
    imgGroundLinksBoven = loadImage('./images/ground(links_boven).gif');
    imgGroundMiddenBoven = loadImage('./images/ground(midden_boven).gif');
    imgGroundRechtsBoven = loadImage('./images/ground(rechts_boven).gif');
    imgGroundLinksOnder = loadImage('./images/ground(links_onder).gif');
    imgGroundMiddenOnder = loadImage('./images/ground(midden_onder).gif');
    imgGroundRechtsOnder = loadImage('./images/ground(rechts_onder).gif');
    imgGroundRechtsMidden = loadImage('./images/ground(rechts_midden).gif');
    imgGroundLinksMidden = loadImage('./images/ground(links_midden).gif');
    imgGroundMiddenBoven = loadImage('./images/ground(midden_boven).gif');
    imgGroundMidden = loadImage('./images/ground(midden).gif');
    imgGroundSingleTileVerticaalBoven = loadImage('./images/ground(single_tile_verticaal_boven).gif');
    imgGroundSingleTileVerticaalMidden = loadImage('./images/ground(single_tile_verticaal_midden).gif');
    imgGroundSingleTileVerticaalOnder = loadImage('./images/ground(single_tile_verticaal_onder).gif');
    imgGroundSingleTile = loadImage('./images/ground(single_tile).gif');
    imgGroundSingleTileHorizontaalLinks = loadImage('./images/ground(links_single_tile_horizontaal).gif');
    imgGroundSingleTileHorizontaalMidden = loadImage('./images/ground(midden_single_tile_horizontaal).gif');
    imgGroundSingleTileHorizontaalRechts = loadImage('./images/ground(rechts_single_tile_horizontaal).gif');
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
    
  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  strokeWeight(3);
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case UITLEG:

        tekenHomeScreen();

        checkMouseIsClicked();

        checkControls();

        if (checkStart()) {
            spelStatus = SPELEN;
        }

        break;
    case SPELEN:
        checkBlokDichtstbij()
        beweegBlokje();
        beweegSpeler();

        tekenVeld();
        tekenSpeler(spelerX, spelerY);
        tekenBlokje();

        if (checkGameOver()) {
            spelStatus = GAMEOVER;
            checkNewHighscore();
        }

        afstand = afstand + 0.02 * blokSpeed;

        berekenPunten();
        
        textSize(40);
        fill('white');
        text('points: ' + score, 0, 30);
        
        break;

    case GAMEOVER:

        tekenVerliesScherm();

        checkMouseIsClicked();
        
        if (checkStart()) {
            spelStatus = SPELEN;
        }

        if (checkMainMenu()) {
            spelStatus = UITLEG;
        }

        break;
    }
} 
