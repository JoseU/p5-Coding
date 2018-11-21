// Pallete colours

// color: #7a7979; gris
// color: #44A5ED; azul
// color: #BF8ACF; morado
// color: #56b6c2; turquesa
// color: #D8B7AD; rosado
// color: #9f4848; rojo
// color: #31B0BD; turquesa 2
// color: #3b3b3b; gris

var tileCountX = 4;
var tileCountY = 4;

var count = 0;
var drawMode = 3;

function setup() {
    var canvas = createCanvas(1000, 1000);
    smooth();

}

function draw() {

  var alfa = map(mouseY, 0, height, 255, 70);
  var colours = [color(68, 165, 237, alfa), color(86, 182, 194, alfa), color(36, 129, 138, alfa), color(191, 138, 207, alfa)];

    rectMode(CENTER);
    noFill();
    background(color("#e8e8e8"));

    count = mouseX / 20 + 5;
    var para = mouseY / height - 0.5;


    for (var gridY = 0; gridY <= tileCountY; gridY++) {

        for (var gridX = 0; gridX <= tileCountX; gridX++) {



            var tileWidth = width / tileCountX;
            var tileHeight = height / tileCountY;
            var posX = tileWidth * gridX + tileWidth / 2;
            var posY = tileHeight * gridY + tileHeight / 2;


            push();
            translate(posX, posY);

            //switch between modules

            switch (drawMode) {

                case 3:
                    for (var i = 0; i <= count; i++) {

                      strokeWeight(para*2.66332);
                      stroke(colours[i%3]);
                      rotate(TWO_PI/para);
                      rect(0, para*tileHeight, (i/count)*tileWidth, para*tileHeight);
                    }
                    break;
            }


  pop();

        }

    }
}
