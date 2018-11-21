'use strict';

// socket io

var socket;
var countColors = 0;
var alpha0;
var alpha1;

var reset = true;


let x2;
let y2;
let mousePressed2;
let size = 60;



function setup() {
  createCanvas(windowWidth, windowHeight);

  //socket.io
  socket = io.connect('http://192.168.0.117.:3002');
  socket.on('mouse', newDrawing);
  socket.on('slider', newSlider);


  stroke(color(220, 65, 97, 30));
  strokeWeight(0.75);
  background(75);
  noFill();
}


function draw() {


  var data = {
    x: mouseX,
    y: mouseY,
    moss: mouseIsPressed
  }

  alpha0 = map(mouseY, 0, height, 10, 105);
  alpha1 = map(y2, 0, height, 10, 105);

  //  console.log('Sending: ' + data.x + " " + data.y);
  socket.emit('mouse', data);




  //print(x2 + ' ' + y2);
  // colors array
  var colors1 = [
    color(220, 65, 97, alpha0),
    color(216, 162, 90, alpha0),
    color(31, 175, 197, alpha0),
    color(120, 210, 120, alpha0)
  ];

  var colors2 = [
    color(220, 65, 97, alpha1),
    color(216, 162, 90, alpha1),
    color(31, 175, 197, alpha1),
    color(120, 210, 120, alpha1)
  ];



  // interpolaciones
  var colorsLerp1 = [

    lerpColor(colors1[1], colors1[0], mouseX / width),
    lerpColor(colors1[0], colors1[2], mouseX / width),
    lerpColor(colors1[3], colors1[1], mouseX / width)
  ];

  var colorsLerp2 = [

    lerpColor(colors2[1], colors2[0], x2 / width),
    lerpColor(colors2[0], colors2[2], x2 / width),
    lerpColor(colors2[3], colors2[1], x2 / width)
  ];


  //circle from mouse
  stroke(colorsLerp1[countColors % 3]);
  ellipse(mouseX, mouseY, size, size);

  //circle from another user
  if (reset) {
    stroke(colorsLerp2[countColors % 3]);
    ellipse(x2, y2, size, size);
    if (mousePressed2) {
      countColors += 1;

    };

  }





}




/*
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas("jose", 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(75);
  if (key == '1') filled = false;
  if (key == '2') filled = true;

  // pauze/play draw loop
  if (key == 'f' || key == 'F') freeze = !freeze;
  if (freeze) {
    noLoop();
  } else {
    loop();
  }


  }
  */



function newDrawing(data) {
  //console.log('Otra ventana "data de x' + ' ' + data.x + "data de y" + ' ' + data.y);

  x2 = data.x;
  y2 = data.y;
  //  ellipse(dataRecX, dataRecY, 60, 60);
  if (data.moss) {
    countColors += 1;
    background(75);
    stroke(75);
    reset = true;
  }

  mousePressed2 = data.moss;

}

function newSlider (args) {

  size = pow(4.24, (args[0]/20));
  console.log(size);
  strokeWeight(pow(args[0]/10, 1.18219));
  //countColors += 1;


}

function mousePressed() {

  reset = false;
  background(75);
  countColors += 1;



}
