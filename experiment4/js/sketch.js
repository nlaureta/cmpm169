// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let audio;
let start = false;
var img;
var song;
var fft;
var button;
var mic;
let startButton;

col = {
      r:255,
      g:0,
      b:0
    };

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }

}

function preload() {
  song = loadSound('pianoMan.mp3');
  img = loadImage('billy.jpg');
}
function setup() {
  createCanvas(600, 400);
  image(img, 600, 400);
  angleMode(DEGREES);
  background(238,235,219);
  //song.play();
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  fft = new p5.FFT(0.5, 64);
  w = width / 64;
  

  mic = new p5.AudioIn();
  mic.start();

  //fill(0);

  textAlign(CENTER, CENTER);
  text("Click Toggle to start", width/2, height/2);
  // startButton = createButton('click toggle to start);
  // //startButton.position(100,100);
  // startButton.mousePressed(playSong);

}
col.r= 40;
col.g= 40;
col.b= 40;
function changeBackground() {

  //background change
  if (col.g > 39 )  {
    col.g= col.g+1;
    col.b= col.b+1;
  }
  if (col.g>75){
    col.g= 20;
    col.b= 20;
  }
}

function draw() {
  if (!start) {
    return;
  }
  
  background(0);

  if(typeof fft != "undefined") {
    background(col.r,col.g,col.b);
    var spectrum = fft.analyze();
  
  
  stroke(255);

  noFill();
  for (i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 256, height, 0);
    strokeWeight(3);
    rect(i * w, y, w * i, height - y);
  }

  // var vol = mic.getLevel();
  // fill(255, 0, 0);
  // ellipse(width / 2, height / 2, 200, vol * 200);  
  // fill(0);
  // ellipse(width / 2, height / 2, 100, vol * 200);
  }
}

function mousePressed() {
  start = true;
}
function playSong() {
  song.play();
}
function getColors(startColor, endColor, n) {
  let colors = [];
  for (let i = 1; i <= n; i++) {
    let c = lerpColor(startColor, endColor, i/n);
    colors.push(c);
  }
  return colors;
}


var intervalId = window.setInterval(function(){

  if (col.g > 39 )  {
    col.r= col.r+1;
    col.g= col.g+1;
    col.b= col.b+1;
  }
  if (col.g>75){
    col.r= 20;
    col.g= 20;
    col.b= 20;
  }
}, 5000);


//setInterval(changeBackground,5000);
// var intervalId = window.setInterval(changeBackground(), 5000);
