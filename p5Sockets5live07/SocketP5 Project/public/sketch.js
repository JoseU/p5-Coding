'use strict';
// socket io
var socket;

// some variables
var countColors = 0;
var alpha0;
var alpha1;
var reset = true;

//capture
let pngLength = 150;
let canvas;

let x2;
let y2;
let newNote = 0;
let size = 40;
let xPixelAmount = 1;
let gridSize = 40;



let ancho = 100;
let alto = 100;

var xMod = [];
var yMod = [];

for (var xPos = 0; xPos <= ancho * 10; xPos += gridSize) {
  xMod.push(xPos);
};

for (var yPos = 0; yPos <= alto * 10; yPos += gridSize) {
  yMod.push(yPos);
};



function setup() {
  var p5Canvas = createCanvas(ancho * 10, alto * 10);
  canvas = p5Canvas.canvas;
//  capturer start
//  capturer.start();

  frameRate(30);

  //socket.io
  socket = io.connect('192.168.0.105.:3000');

  socket.on('mouse', newMouse);
  socket.on('noteOn', newNote);
  socket.on('frecuency', newFreq);

  noCursor();
  stroke(75);
  strokeWeight(20);
  background(75);
  noFill();
  fullscreen();
  rectMode(CENTER);

}


function draw() {


  var data = {
    x: mouseX,
    y: mouseY
  }



  alpha0 = map(mouseY, 0, height, 10, 105);
  alpha1 = map(y2, 0, height, 10, 105);

  //console.log('Sending: ' + data.x + " " + data.y);
  socket.emit('mouse', data);

  if (mouseIsPressed) {
    newNote = 1;
  } else {
    newNote = 0;
  };

  socket.emit('noteOn', newNote);
  print("sending newnote" + " " + newNote);


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

  print("entroSize" + " " + size);
  strokeWeight(size / 25);
  //circle from mouse






  for (var x = 0; x <= xMod.length; x++) {
    for (var y = 0; y <= yMod.length; y++) {
      if (mouseX >= xMod[x] && mouseX <= xMod[x + 1] && mouseY >= yMod[y] && mouseY <= yMod[y + 1]) {
        //print("rect" + x)
        fill(colorsLerp1[countColors % 3]);
        rect(xMod[x], yMod[y], size, size);
      };

    };
  };


  for (var x = 0; x <= xMod.length; x++) {
    for (var y = 0; y <= yMod.length; y++) {
      if (x2 >= xMod[x] && x2 <= xMod[x + 1] ){
        //print("rect" + x)
        fill(colorsLerp2[countColors % 3]);
        rect(xMod[x], yMod[y], size, size);
      };

    };
  };



/*
if(frameCount < pngLength) {
  capturer.capture(canvas);
} else if ( frameCount === pngLength){
  capturer.stop();
  capturer.save();
};

*/
  //stroke(colorsLerp2[countColors % 3]);
  //rect(mouseX, mouseY, size, size);

  //circle from another user
  //stroke(colorsLerp2[countColors % 3]);
  //rect(x2, y2, size, size);





}



function newMouse(data) {
  x2 = data.x;
  y2 = data.y;
}

function newFreq(freq) {

  size = freq;
  console.log("size" + " " + size);
}




function mousePressed() {
  background(75);
  countColors += 1;


}
