'use strict';
// socket io
var socket;

// some variables
var countColors = 0;
var alpha0;
var alpha1;
var reset = true;


let x2;
let y2;
let newNote = 0;
let size = 40;



function setup() {
  createCanvas(windowWidth, windowHeight);

  //socket.io
  socket = io.connect('http://172.16.162.100:3000');

  socket.on('mouse', newMouse);
  socket.on('noteOn', newNote);
  socket.on('frecuency', newFreq);


  stroke(color(220, 65, 97, 30));
  strokeWeight(size);
  background(75);
  noFill();
  fullscreen();
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
  //print("sending newnote" + " " + newNote);


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

  //print("entroSize" + " " + size);
  strokeWeight(size / 25);
  //circle from mouse
  stroke(colorsLerp1[countColors % 3]);
  ellipse(mouseX, mouseY, size, size);

  //circle from another user
  stroke(colorsLerp2[countColors % 3]);
  ellipse(x2, y2, size, size);

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
