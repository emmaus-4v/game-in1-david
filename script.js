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
var spelStatus = SPELEN;

var spelerX = 63; // x-positie van speler
var spelerY = 605; // y-positie van speler
var spelerWidth = 40;
var spelerHeight = 75;

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0;
var afstand = 0; // aantal behaalde punten

var maxJumpHeight = 50;
var jumpSpeed = 4;
var valStatus = false;
var springStatus = false;
var groundHeight = 605;

var bukStatus = false;

var blokX = 1280;
var blokY = 605;
var blokSpeed = 5;
//var blokLocatie = [[1280],[605]]
//var blokAfmeting = [[30],[30]]


/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("purple");
  rect(0, 0, width, height);
};


/**
 * Tekent de vijand
 * parameter weggehaald, vraag ernaar x-coördinaat
 * @param {number} y y-coördinaat
 * @param {number} widthBlok breedte blokje
 * @param {number} heightBlok hoogte blokje
 */
var tekenBlokje = function(y, widthBlok, heightBlok) { // tekent blok
    fill("red");
    rect(blokX, y, widthBlok, heightBlok);
    if ((spelerX + spelerWidth >= blokX && spelerX + spelerWidth <= blokX + 60) || (spelerX >= blokX && spelerX <= blokX + 60)) {
       if (springStatus === true || valStatus === true ) {
           groundHeight = blokY - spelerHeight;
       }
    } else {
        groundHeight = 605;
    }

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  if (bukStatus === false) {
        spelerWidth = 40;
        spelerHeight = 75;
        fill("white");
        rect(x, y, spelerWidth, spelerHeight);
  }
  if (bukStatus === true) {
        spelerWidth = 75;
        spelerHeight = 40;
        fill("white");
        rect(x, y + 35, spelerWidth, spelerHeight);
  }
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegBlokje = function() {
    blokX = blokX - blokSpeed;
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
    if (springStatus === false) { // zodat maxJumpHeight alleen veranderd wordt als de speler op de grond staat.
        maxJumpHeight = spelerY - 250;
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
        jumpSpeed = 4; // zodat de speler de volgende keer niet met een vreemde springsnelheid springt.
        spelerY = groundHeight; // zodat de speler  altijd op de beginplaats terugkomt.
    }
    
    if (keyIsDown(16) && springStatus === false && valStatus === false) { // als je op shift drukt bukt de speler. Het zorgt er ook voor dat je niet tijdens het springen kan bukken.
        bukStatus = true;
        if (blokSpeed > 0.1) {
        blokSpeed = blokSpeed - 0.1;
        }
        // snelheid van de blokken nog vertragen, zodat je niet oneindig lang kan sliden.
    } else {
        bukStatus = false;
        if (blokSpeed < 5) {
        blokSpeed = blokSpeed + 0.1;
        }
    }
}

/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return true;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
   if (((spelerX + spelerWidth >= blokX && spelerX + spelerWidth <= blokX + 60) || (spelerX >= blokX && spelerX <= blokX + 60))  && ((spelerY + spelerHeight > blokY && spelerY + spelerHeight < blokY + 61) || (spelerY > blokY && spelerY < blokY + 61))) {
        return true;
    }
};
 
var berekenPunten = function () {
    score = round(afstand);
    return score;
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
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegBlokje();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenBlokje(blokY, 60, 60);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }

      afstand = afstand + 0.02 * blokSpeed;

      berekenPunten();
    
      textSize(40);
      text(score, 0, 30, 30, 40);
      
      break;
  }
}
