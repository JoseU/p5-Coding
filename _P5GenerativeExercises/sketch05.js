//dumb Agents 2


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

// P_2_2_2_01


'use strict';

var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;
var direction = SOUTH;

var stepSize = 3;
var minLength = 10;
var diameter = 1;
var angleCount = 7;
var angle;
var reachedBorder = false;

var posX;
var posY;
var posXcross;
var posYcross;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB, 360, 100, 100, 100);
  background(360);

  angle = getRandomAngle(direction);
  posX = floor(random(width));
  posY = 5;
  posXcross = posX;
  posYcross = posY;
}

function draw() {
  var speed = int(map(mouseX, 0, width, 0, 20));
  for (var i = 0; i <= speed; i++) {

    // ------ draw dot at current position ------
    strokeWeight(1);
    stroke(180, 0, 0);
    point(posX, posY);

    // ------ make step ------
    posX += cos(radians(angle)) * stepSize;
    posY += sin(radians(angle)) * stepSize;

    // ------ check if agent is near one of the display borders ------
    reachedBorder = false;

    if (posY <= 5) {
      direction = SOUTH;
      reachedBorder = true;
    } else if (posX >= width - 5) {
      direction = WEST;
      reachedBorder = true;
    } else if (posY >= height - 5) {
      direction = NORTH;
      reachedBorder = true;
    } else if (posX <= 5) {
      direction = EAST;
      reachedBorder = true;
    }

    // ------ if agent is crossing his path or border was reached ------
    loadPixels();
    var currentPixel = get(floor(posX), floor(posY));
    if (
      reachedBorder ||
      (currentPixel[0] != 255 && currentPixel[1] != 255 && currentPixel[2] != 255)
    ) {
      angle = getRandomAngle(direction);

      var distance = dist(posX, posY, posXcross, posYcross);
      if (distance >= minLength) {
        strokeWeight(3);
        stroke(0, 0, 0);
        line(posX, posY, posXcross, posYcross);
      }

      posXcross = posX;
      posYcross = posY;
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(360);
}

function getRandomAngle(currentDirection) {
  var a = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
  if (currentDirection == NORTH) return a - 90;
  if (currentDirection == EAST) return a;
  if (currentDirection == SOUTH) return a + 90;
  if (currentDirection == WEST) return a + 180;
  return 0;
}
