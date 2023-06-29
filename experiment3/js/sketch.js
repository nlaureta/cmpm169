// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

//Credits: https://editor.p5js.org/Ruyi_Chen/sketches/H1UJM_0nQ
//Song Used: Billy Joel - Piano Man https://www.youtube.com/watch?v=QwVjTlTdIDQ 

let audio;
let start = false;
var img;
var song;
var fft;
var button;
var mic;
let startButton;
let vid;
let canvas;


function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
    vid.pause();
  } else {
    song.play();
    vid.loop();
  }

}

function preload() {
  song = loadSound('pianoMan.mp3');
  //img = loadImage('billy.jpg');
  
}
function setup() {
  canvas = createCanvas(1280, 720);
  canvas.position(100,1050);
  canvas.style('z-index', 1);
  
  angleMode(DEGREES);
  //background(238,235,219);
  //song.play();
  //button = createButton('toggle');
  //button.mousePressed(toggleSong);
  fft = new p5.FFT(0.5, 64);
  w = width / 64;

  vid = createVideo('cassette.mp4');
  
  vid.style('z-index', 0);
  vid.position(100,1050);
  
  mic = new p5.AudioIn();
  mic.start();

  //fill(0);

  
  //vid.position(0,0);
  
  // startButton = createButton('click toggle to start);
  // //startButton.position(100,100);
  // startButton.mousePressed(playSong);

}

function draw() {
  if (start) {
    return;
  }
  //image(img, 0, 0);
  //background('rgba(0,255,0, 1)');
  clear();
  if(typeof fft != "undefined") {
    //background(col.r,col.g,col.b);
    var spectrum = fft.analyze();
  
  
  stroke(random(255));

  //noFill();
  for (i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 356, height, 0);
    strokeWeight(3);
    line(i * w, y, w * i, height);
  }

  // var vol = mic.getLevel();
  // fill(255, 0, 0);
  // ellipse(width / 2, height / 2, 200, vol * 200);  
  // fill(0);
  // ellipse(width / 2, height / 2, 100, vol * 200);
  }
}

function mousePressed() {
  if(start)
    toggleSong();
  start = !start;
  
}
function playSong() {
  song.play();
}

var loader = document.querySelector(".loader");
document.getElementById("audiofile").onchange = function(event) {
    if(event.target.files[0]) {
        if(typeof song != "undefined") { // Catch already playing songs
            song.disconnect();
            song.stop();
            clear();
        }

        // Load our new song
        song = loadSound(URL.createObjectURL(event.target.files[0]));
        //song.play();
        //loader.classList.add("loading");
    }
}
