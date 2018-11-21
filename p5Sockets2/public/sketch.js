
'use strict';

// socket io

var socket;
var countColors = 0;
var alpha;


let dataRecX;
let dataRecY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //socket.io
  socket = io.connect('http://192.168.0.105:3000');
  socket.on('mouse', newDrawing);

  stroke(color(220, 65, 97, 30));
  strokeWeight(0.75);
  background(75);
  noFill();
}


function draw() {


  var data = {
    x: mouseX,
    y: mouseY
  }

alpha = mouseY%255 || dataRecY%255;
//  console.log('Sending: ' + data.x + " " + data.y);
  socket.emit('mouse', data);


  print(dataRecX + ' ' + dataRecY);
  // colors array
  var colors = [
    color(220, 65, 97, alpha),
    color(216, 162, 90, alpha),
    color(31, 175, 197, alpha),
    color(120, 210, 120, alpha)
  ];



  // interpolaciones
  var colors2 = [

  lerpColor(colors[1], colors[0], mouseX/width),
  lerpColor(colors[0], colors[2], dataRecX/width),
  lerpColor(colors[3], colors[1], mouseX/width)
  ];

    stroke(colors2[countColors%3]);

    ellipse(mouseX, mouseY, 60, 60);

    stroke(colors2[countColors%3]);
    ellipse(dataRecX, dataRecY, 60, 60);




}


function mousePressed() {
  // init shape on mouse position
  countColors = countColors + 1;
  background(75);


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
    fill(34,2);
    dataRecX = data.x;
    dataRecY = data.y;
  //  ellipse(dataRecX, dataRecY, 60, 60);


  }
