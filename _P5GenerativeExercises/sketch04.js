//dumb Agents

// color: #7a7979; gris
// rgb(122,121,121)
// color: #44A5ED; azul
// rgb(68,165,237)
// color: #BF8ACF; morado
// rgb(191,138,207)
// color: #56b6c2; turquesa
// rgb(86,182,194)
// color: #D8B7AD; rosado
// rgb(216,183,173)
// color: #9f4848; rojo
// rgb(159,72,72);
// color: #31B0BD; turquesa 2
// rgb(49,176,189)
// color: #3b3b3b; gris
// rgb(59,59,59)

'use strict'

var NORTH = 0;
var NORTHEAST = 1;
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST = 7;
var direction;

var stepSize = 1;
var diameter = 1;

var posX;
var posY;

function setup() {
  createCanvas(1000, 1000);
  background(75);
  noFill( );
  stroke(color(86,182,194,100));
  posX = width / 2;
  posY = height / 2;
}

function draw() {


  for (var i = 0; i <= mouseX; i++) {
    direction = int( random (0, 8));
		strokeWeight(direction * 1.6681);
    if (direction == NORTH) {
      stroke(color(68,165,237,70));
      posY -= stepSize;
    } else if (direction == NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
      stroke(color(191,138,207,70));
    } else if (direction == EAST) {
      posX += stepSize;
      stroke(color(68,165,237,10));
    } else if (direction == SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
      stroke(color(49,176,189,30));
    } else if (direction == SOUTH) {
      posY += stepSize;
      stroke(color(59,59,59,10));
    } else if (direction == SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
      stroke(color(49,176,189,10));
    } else if (direction == WEST) {
      posX -= stepSize;
      stroke(color(68,165,237,218));
    } else if (direction == NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }


    if (posX > width) posX = 0;
    if (posX < 0) posX = width;
    if (posY < 0) posY = height;
    if (posY > height) posY = 0;

    ellipse(posX + stepSize /2, posY + stepSize / 2, diameter, diameter);

    }

  }

  function keyReleased() {
    if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
    if (keyCode == DELETE || keyCode == BACKSPACE) clear();
  }
