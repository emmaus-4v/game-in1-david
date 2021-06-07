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

var spelerX = 63; // x-positie van speler
var spelerY = 605; // y-positie van speler
var spelerWidth = 40;
var spelerHeight = 75;

//var kogelX = 0;    // x-positie van kogel
//var kogelY = 0;    // y-positie van kogel

//var vijandX = 0;   // x-positie van vijand
//var vijandY = 0;   // y-positie van vijand

var score = 0;
var highscore = 0;
var endscore = 0;
var afstand = 0; // aantal behaalde punten

var maxJumpHeight = 50;
var jumpSpeed = 4;
var valStatus = false;
var springStatus = false;
var groundHeight = 605;

var bukStatus = false;

var blokX = [1280, 1600, 2060];
var blokY = [0, 0, 0];
var blokSpeed = 5.025;
var blokWidth = [0, 0, 0];
var blokHeight = [0, 0, 0];

var afstandBlok0;
var afstandBlok1;
var afstandBlok2;
var actiefBlok;

var controlScherm = false;

var mouseIsClicked = false;
var mouseWasClicked = false;

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

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
    image(imgBackground, 0, 0, width, height);
  /*fill("purple");
  rect(0, 0, width, height);
  fill('brown');
  rect(0, 680, width, height - 680);*/
};


/**
 * Tekent de vijand
 * parameter weggehaald, vraag ernaar x-coördinaat
 */
var tekenBlokje = function() { // tekent blok
    fill("red");
    for (var i = 0; i < 3; i = i + 1) {
        rect(blokX[i], blokY[i], blokWidth[i], blokHeight[i]);
        if ((spelerX + spelerWidth >= blokX[actiefBlok] && spelerX + spelerWidth <= blokX[actiefBlok] + blokWidth[actiefBlok]) || (spelerX >= blokX[actiefBlok] && spelerX <= blokX[actiefBlok] + blokWidth[actiefBlok])) {
            if (spelerY + spelerHeight <= blokY[actiefBlok] && bukStatus === false) {
                groundHeight = blokY[actiefBlok] - spelerHeight;
            } else if (spelerY + spelerHeight + 35 <= blokY[actiefBlok] && bukStatus === true) {
                groundHeight = blokY[actiefBlok] - (spelerHeight + 35);
            }
        } else {
            groundHeight = 605;
        }
        if (blokX[i] < -350) {
            blokX[i] = 1280;
            blokY[i] = round(random(430, 600));
            blokWidth[i] = round(random(60, 250));
            blokHeight[i] = round(random(60, 130));
            while (blokY[i] + blokHeight[i] > 680) {
                blokHeight[i] = round(random(60, 80));
            }
        }
    }
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
/*var tekenKogel = function(x, y) {


};*/


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
    for (var i = 0; i < 3; i = i + 1) {
        blokX[i] = blokX[i] - blokSpeed;
    }
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
/*var beweegKogel = function() {

};*/


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
        if (blokSpeed > 0) {
        blokSpeed = blokSpeed - 0.075;
        }
        // snelheid van de blokken nog vertragen, zodat je niet oneindig lang kan sliden.
    } else {
        bukStatus = false;
        if (blokSpeed < 5.025) {
        blokSpeed = blokSpeed + 0.075;
        }
    }
}

/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
/*var checkVijandGeraakt = function() {

  return true;
};*/


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
/*var checkSpelerGeraakt = function() {
    
  return false;
};*/


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    for (var i = 0; i < 3; i = i + 1) {
         if (bukStatus === false && (spelerX - blokX[i] <= blokWidth[i] && blokX[i] - spelerX <= spelerWidth  && spelerY - blokY[i] <= blokHeight[i] - 1 && blokY[i] - spelerY <= spelerHeight - 1)){
            return true;
        }
        if (bukStatus === true && (spelerX - blokX[i] <= blokWidth[i] && blokX[i] - spelerX <= spelerWidth  && spelerY + 35 - blokY[i] <= blokHeight[i] - 1 && blokY[i] - spelerY + 35 <= spelerHeight - 1)){
            return true;
        }
    }
};
 
var berekenPunten = function () {
    score = round(afstand);
    return score;
}

var gameReset = function () {
     for (var i = 0; i < 3; i = i + 1) {
            spelerY = 605;
            score = 0;
            afstand = 0;
            jumpSpeed = 4;
            valStatus = false;
            springStatus = false;
            groundHeight = 605;
            bukStatus = false;
            if (i === 0) {
                blokX[i] = 1280;
            } else if (i === 1) {
                blokX[i] = 1600;
            } else if (i === 2) {
                blokX[i] = 2060;
            }
            blokSpeed = 5.025;
            blokY[i] = round(random(450, 600));
            blokWidth[i] = round(random(60, 250));
            blokHeight[i] = round(random(60, 130));
            while (blokY[i] + blokHeight[i] > 680) {
                blokHeight[i] = round(random(60, 80));
            }
    }
}

var tekenVerliesScherm = function () {
    fill('white');
    rect(0, 0, 1280, 720);
    fill('gray');
    textSize(80);
    text('YOU LOST', 440, 350)
    textSize(30);
    text('Score:' + endscore, 450, 400);
    text('Highscore:' + highscore, 680, 400);
    var buttonText = ['restart', 'main menu'] 
    for (var i = 0; i < 2; i = i + 1) {
        fill('gray');
        textSize(40);
        text(buttonText[i], 230 * i + 450 , 477);
        noFill();
        rect(270 * i + 380, 415, 250, 100);
    }
}

var checkStart = function () {
    if (mouseX > 380 && mouseX < 630 && mouseY > 415 && mouseY < 515 && mouseIsClicked === true) {
        return true;
    }
}

var tekenHomeScreen = function () {
    fill('white');
    rect(0, 0, 1280, 720);
    fill('gray');
    textSize(80);
    text('Jumpin\' Jack', 410, 100)
    textSize(30);
    if (highscore > 0) {
        text('Highscore:' + highscore, 560, 400)
    }
    var buttonText = ['play', 'controls'] 
    for (var i = 0; i < 2; i = i + 1) {
        fill('gray');
        textSize(40);
        text(buttonText[i], 230 * i + 470 , 477);
        noFill();
        rect(270 * i + 380, 415, 250, 100);
    }
} 

var checkNewHighscore = function () {
    if (endscore > highscore) {
        highscore = endscore;
    }
}

var checkControls = function () {
    if (mouseX > 650 && mouseX < 900 && mouseY > 415 && mouseY < 515 && mouseIsClicked === true && spelStatus === UITLEG) {
        controlScherm = true;
    }
    if (controlScherm === true) {
        fill('white');
        rect(1000, 250, 150, 90);
        line(1000, 265, 1150, 265)
        line(1137, 250, 1137, 265)
        fill('gray');
        textSize(16);
        text('Controls', 1003, 263)
        text('x', 1140, 262)
        textSize(18);
        text('Jump = Spacebar', 1003, 290)
        text('Slide = Shift', 1003, 320)
    }
    if (mouseX > 1137 && mouseX < 1150 && mouseY > 250 && mouseY < 265 && mouseIsClicked === true) {
        controlScherm = false;
    }
}

var checkMainMenu = function () {
    if (mouseX > 650 && mouseX < 900 && mouseY > 415 && mouseY < 665 && mouseIsClicked === true && spelStatus === GAMEOVER) {
        return true;
    }
}

var checkMouseIsClicked = function () {
    if(mouseIsPressed && mouseIsClicked === false && mouseWasClicked === false) {
        mouseIsClicked = true;
    } else if (mouseIsPressed) {
        mouseIsClicked = false;
        mouseWasClicked = true;
    } else {
        mouseIsClicked = false;
        mouseWasClicked = false;
    }
}

var checkBlokDichtstbij = function() {
    afstandBlok0 = blokX[0] - (spelerX + spelerWidth);
    afstandBlok1 = blokX[1] - (spelerX + spelerWidth);
    afstandBlok2 = blokX[2] - (spelerX + spelerWidth);
    if (afstandBlok0 < afstandBlok1 && afstandBlok0 < afstandBlok2 && afstandBlok0 >= -1 * (blokWidth[0] + spelerWidth)) {
        actiefBlok = 0;
    }
    if ((afstandBlok1 < afstandBlok0 || afstandBlok0 <= -1 * (blokWidth[0] + spelerWidth)) && afstandBlok1 < afstandBlok2 && afstandBlok1 >= -1 * (blokWidth[1] + spelerWidth)) {
        actiefBlok = 1;
    }
    if (afstandBlok2 < afstandBlok0 && afstandBlok2 < afstandBlok1 && afstandBlok2 >= -1 * (blokWidth[2] + spelerWidth)) {
        actiefBlok = 2;
    }
}

function preload() {
    imgJack = loadImage('./images/jack_staan.gif')
    imgJackSlide = loadImage('./images/jack_slide.gif')
    imgBackground = loadImage('./images/background.gif')
    imgGroundLinksBoven = loadImage('./images/ground(links_boven).gif')
    imgGroundMiddenBoven = loadImage('./images/ground(midden_boven).gif')
    imgGroundRechtsBoven = loadImage('./images/ground(rechts_boven).gif')
    imgGroundLinksOnder = loadImage('./images/ground(links_onder).gif')
    imgGroundMiddenOnder = loadImage('./images/ground(midden_onder).gif')
    imgGroundRechtsOnder = loadImage('./images/ground(rechts_onder).gif')
    imgGroundRechtsMidden = loadImage('./images/ground(rechts_midden).gif')
    imgGroundLinksMidden = loadImage('./images/ground(links_midden).gif')
    imgGroundMiddenBoven = loadImage('./images/ground(midden).gif')
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
    for (var i = 0; i < 3; i = i + 1) {
  blokY[i] = round(random(450, 600));
  blokWidth[i] = round(random(60, 250));
  blokHeight[i] = round(random(60, 130));
   while (blokY[i] + blokHeight[i] > 680) {
       blokHeight[i] = round(random(60, 80));
   }
    }
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
      //beweegKogel();
      beweegSpeler();
      
      /*if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }*/

      tekenVeld();
      tekenSpeler(spelerX, spelerY);
      tekenBlokje();
      //tekenKogel(kogelX, kogelY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
        endscore = score;
        checkNewHighscore();
      }

      afstand = afstand + 0.02 * blokSpeed;

      berekenPunten();
    
      textSize(40);
      fill('white');
      text(score, 0, 30);
      
      break;

      case GAMEOVER:

      gameReset();

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
