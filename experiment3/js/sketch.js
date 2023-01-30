// sketch.js - purpose and description here
// Author: Nathan Laureta
// Date: 1/31/2022

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

//credit: line pattern and middle circle by https://editor.p5js.org/Sylvesterd2/sketches/B1kLLJ82b
/**
 * lines and circle
 *
 * MOUSE
 * left click hold          : change color to color picker
 *
 * KEYS
 * s                        : save png
 * 1(toggle)                : randomize color
 * 2                        : color circle and line blue
 * 3                        : color cirlce and line green
 * 4                        : color circle and line red
 * 5                        : color circle and line yellow
 * 6                        : color circle and line from color picker
 * 0                        : color circle and line black
 */


var x = 0;
var y = 0;
var gap = 30;
var deg = 0;
var circlePaint;
var color_picker;
var rgb = false;

function setup() {
	createCanvas(800,800);
	background(35);
    paint = 'blue';
    circlePaint = 'blue';
    color_picker = createColorPicker('#ed225d');
	frameRate(60);
	
}

function mousePressed() { //If you click the mouse, the lines and shapes will turn cyan.
	paint = color_picker.color(); 
}

function mouseReleased() { //If you release the mouse click, the lines and shapes will turn red.
	paint = circlePaint; 
}

function draw() {
    //background(color_picker.color());

	spin();
    if(rgb) {
        paint = color(random(255), random(255),random(255));
    }
	maze();
}

function maze() { // This creates a random pattern of lines.
    stroke(paint);
    strokeWeight(2);
    if (random(2) < 0.5) { // The if statement changes the direction of the lines.
        line(x, y, x + gap, y + gap);
    } else {
        line(x, y + gap, x + gap, y);
    }

    x = x + random(20) //This allows the lines to go across the canvas.
    if (x > width) {
        x = 0;
        //y = y + gap;
    }

}
			
function spin() { //This creates the circle in the middle of the canvas.
    scale(.5);
    translate(width, height);
    rotate(radians(deg));
    deg++;
    fill(paint);
    rect(0, 0, 100, 100);
}

function keyPressed() { 
    if (keyCode == 32) {
        saveCanvas('', 'png');
    }

    if (key == '1') {
        print("1 pressed");
        rgb = !rgb;
    }
    if (key == '2') {paint = 'blue';circlePaint = 'blue';}
    if (key == '3'){ paint = 'green';circlePaint = 'green';}
    if (key == '4'){ paint = 'red';circlePaint = 'red';}
    if (key == '5'){ paint = 'yellow';circlePaint = 'yellow';}
    if (key == '6'){ paint = color_picker.color();circlePaint = color_picker.color();}
    if (key == '0'){ paint = 'black';circlePaint = 'black';}
} 