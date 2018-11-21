



// P_2_2_3_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * form mophing process by connected random agents
 *
 * MOUSE
 * click               : start a new circe
 * position x/y        : direction of floating
 *
 * KEYS
 * 1-2                 : fill styles
 * f                   : freeze. loop on/off
 * Delete/Backspace    : clear display
 * s                   : save png
 */
'use strict';


// Noise variables
var start1 = 0;
var start2 = 0;
var start3 = 0;
var start4 = 0;
var xincrement1 = 0.02;
var xincrement2 = 50;
var xincrement3 = 300;
var xincrement4 = 10000;


// Color variables
var countColors = 0;
var alpha = 15;

// Form variables
var formResolution = 21;
var stepSize = 1.618033 * 1.25;
var distortionFactor = 1;
var initRadius = 150;
var centerX;
var centerY;
var x = [];
var y = [];

var filled = false;
var freeze = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // init shape
  centerX = width / 2;
  centerY = height / 2;
  var angle = radians(360 / formResolution);
  for (var i = 0; i < formResolution; i++) {
    x.push(cos(angle * i) * initRadius);
    y.push(sin(angle * i) * initRadius);
  }

  stroke(color(220,65,97,30));


  strokeWeight(0.75);
  background(75);
}

function draw() {


// Transparency function
if (mouseY >= height/2) {
	alpha = map(mouseY , height/2, height, 149, 5);
  strokeWeight(map(mouseY, height/2, height, 0.2, 1.61880*1.25));

} else {
  alpha = map(mouseY , 0, height, 5, 149);
  strokeWeight(map(mouseY, height/2, height, 1.61880*1.25, 0.2))
};



  // colors array
  var colors = [
color(220,65,97,alpha),
color(31,175,197,alpha),
color(216,162,90,alpha)
];

    stroke(colors[countColors%3]);


  // floating towards mouse position
  centerX += (mouseX - centerX) * 0.01;
  centerY += (mouseY - centerY) * 0.01;

  // calculate new points

	var xoff1 = start1;
	var xoff2 = start2;
	var xoff3 = start3;
	var xoff4 = start4;


  for (var i = 0; i < formResolution; i++) {


   /*
    var noiseVal1=  (noise(stepRand1) * -stepSize) + stepSize/2;
    var noiseVal2=  (noise(stepRand2) * -stepSize) + stepSize/2;
    var noiseVal3=  (noise(stepRand3) * -stepSize) + stepSize/2;
    var noiseVal4=  (noise(stepRand4) * -stepSize) + stepSize/2;


    x[i] += noiseVal1;
    y[i] += noiseVal2;

     x[i] += noiseVal2;
    y[i] += noiseVal2;


    */

  var stepRand1 = map(noise(xoff1), 0, 1, -stepSize, stepSize);
  var stepRand2 = map(noise(xoff2), 0, 1, -stepSize, stepSize);
  var stepRand3 = map(noise(xoff3), 0, 1, -stepSize, stepSize);
  var stepRand4 = map(noise(xoff4), 0, 1, -stepSize, stepSize);


    x[i] += stepRand1;
    y[i] += stepRand2;
    x[i] += stepRand3;
    y[i] += stepRand4;

		xoff1 += xincrement1;
  	xoff2 += xincrement2;
  	xoff3 += xincrement3;
  	xoff4 += xincrement4;


    // uncomment the following line to show position of the agents
   // ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
  }



  print(stepRand1);
  print(stepRand2);


  // With each cycle, increment xoff

  if (filled) {

    var n = noise(xoff)*3;
    //var n = random(3);

    fill(colors[int(n)]);
    alpha = 255;




  } else {
    noFill();
  }


  beginShape();
  // first controlpoint
  curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);

  // only these points are drawn
  for (var i = 0; i < formResolution; i++) {
    curveVertex(x[i] + centerX, y[i] + centerY);

  start1 += xincrement1;
  start2 += xincrement2;
  start3 += xincrement3;
  start4 += xincrement4;
  }
  curveVertex(x[0] + centerX, y[0] + centerY);

  // end controlpoint
  curveVertex(x[1] + centerX, y[1] + centerY);
  endShape();
}

function mousePressed() {
  // init shape on mouse position

  countColors = countColors + 1;

  centerX = mouseX;
  centerY = mouseY;
  var angle = radians(360 / formResolution);
  var radius = initRadius * random(0.5, 1);
  for (var i = 0; i < formResolution; i++) {
    x[i] = cos(angle * i) * initRadius;
    y[i] = sin(angle * i) * initRadius;
  }
}

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
