// sketch.js - purpose and description here
// Author: Nathan Laureta
// Date: 1/24/2023

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// P_2_1_2_01
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
 * changing size and position of circles in a grid
 *
 * MOUSE
 * position x          : circle position
 * position y          : circle size
 * left click          : random position
 *
 * KEYS
 * s                        : save png
 * hold shift/left click    : draw
 * space(toggle)            : pause the cirlces 
 * backspace                : clear drawing
 * 1                        : color cirlces red
 * 2                        : color circles blue
 * 3                        : color cirlces green
 * 4(toggle)                : color circles and background randomly every click
 * 0                        : switch to default colors
 * connect the dots with the paused random circles
 */
'use strict';

var tileCount = 20;
var actRandomSeed = 0;

var circleAlpha = 130;
var circleColor;
var points = []; 
let pause = false;
let rgb = false;
let bgColor = 0;

function setup() {
  createCanvas(1280, 900);
  noFill();
  strokeWeight(5);
  circleColor = color(0, 0, 0, circleAlpha);
  bgColor = 255;
}

function draw() {
  translate(width / tileCount / 2, height / tileCount / 2);

  background(bgColor);

  stroke(circleColor);
    
  strokeWeight(mouseY / 60);
 
  beginShape();
  for(var i in points) {
    // grab the point by index
    var one_point = points[i];
    curveVertex(one_point.x, one_point.y);
  }
	endShape();

    if(rgb) {
        bgColor = color(random(255), random(255), random(255));
        circleColor = color(random(255), random(255),random(255), circleAlpha);
    }

  randomSeed(actRandomSeed);

    for (var gridY = 0; gridY < tileCount; gridY++) {
        for (var gridX = 0; gridX < tileCount; gridX++) {

            var posX = width / tileCount * gridX;
            var posY = height / tileCount * gridY;
            var shiftX = random(-mouseX, mouseX) / 20;
            var shiftY = random(-mouseX, mouseX) / 20;

            ellipse(posX + shiftX, posY + shiftY , mouseY / 15, mouseY / 15);

        }
    }
}

function mousePressed() {
    if(!keyIsDown(SHIFT) && !pause)
        actRandomSeed = random(100000);
}

function mouseDragged(){
    // create an object as empty point
    if(keyIsDown(SHIFT)) {
        beginShape();
  for(var i in points) {
    // grab the point by index
    var one_point = points[i];
    curveVertex(one_point.x, one_point.y);
  }
	endShape();
    var one_point = {};
    one_point.x = mouseX - 35;
    one_point.y = mouseY ;
    
    // add the point to the array
    points.push(one_point);
    }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if(key == ' ') {
    //print('Space pressed');
    pause = !pause;
  }
  if (key == '1') circleColor = color(255, 0, 0, circleAlpha);
  if (key == '2') circleColor = color(0, 255, 0, circleAlpha);
  if (key == '3') circleColor = color(0, 0, 255, circleAlpha);
  if (key == '4') rgb = !rgb;
  if (key == '0') {
        circleColor = color(0, 0, 0, circleAlpha);
        bgColor = 255;
    }
  if (keyCode === BACKSPACE) {
    //print("backspace");
    points = [];
  }
  if(pause) {
    noLoop();
  }else 
    loop(); 
  
 
}

