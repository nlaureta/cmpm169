/*****************************************************************************
  p5.asciiart 0.3.00a by Paweł Janicki, 2017-2019
    https://tetoki.eu/asciiart | https://paweljanicki.jp

*******************************************************************************

  ASCIIART by Paweł Janicki is licensed under a Creative Commons
  Attribution-ShareAlike 4.0 International License
  (http://creativecommons.org/licenses/by-sa/4.0/). Based on a work at:
  https://tetoki.eu.

*******************************************************************************

/*
  The object that will be responsible for generating ASCII art graphics. The
  object will be derived from the AsciiArt pseudo-class from the p5.asciiart
  library, so remember to add the p5.asciiart library to the project in the
  appropriate html file.
*/

let captions;
let currentCaption = "";
let currentImage = "";
let lastChange = 0;
let changeInterval = 5000; // Change every 5 seconds
let prevCaptionIndex = -1;
let inputBox;
var myAsciiArt;

var asciiart_width = 120; var asciiart_height = 60;
var images = [];
var gfx;
var ascii_arr;
var cyclic_t;

function preload() {
  images[0] = loadImage('drake.png');
  images[1] = loadImage('linus.png');
  images[2] = loadImage('einstein.png');
  images[3] = loadImage('pikachu.png');
  images[4] = loadImage('rock_300x300.png');
  images[5] = loadImage('sponge.png');
  images[6] = loadImage('trollface.png');
  images[7] = loadImage('patrick.png');
  images[8] = loadImage('gigachad.png');

  captions = [
    "When you ask someone whats up and they answer the sky",
    "When you get yelled at for something that you didn't do",
    "When the games goes into the loading screen and you see your reflection",
    "When your parents see you get bad grades",
    "When you realize 2022 is pronounced \"2020 too\"",
    "When someone says they don't drink coffee",
    "Boss: Whos was in charge of making time estimates? Me:",
    "When you take a piss but suddenly realize you're in a dream",
    "Retail workers when they hear Mariah Carey start singing",
  ]
}

function setup() {
  createCanvas(1900, 1000); // we need some space...
  
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  
  myAsciiArt = new AsciiArt(this);
  
  myAsciiArt.printWeightTable();
  
  textAlign(CENTER, CENTER); textFont('monospace', 8); textStyle(NORMAL);
  noStroke(); fill(255);
  /*
    Finally we set the framerate.
  */
  frameRate(30);
}

function draw() {
  background(0);

  cyclic_t = millis() * 0.0002 % images.length;

  gfx.image(images[floor(cyclic_t)], 0, 0, gfx.width, gfx.height);
 
  gfx.filter(POSTERIZE, 3);
  
  ascii_arr = myAsciiArt.convert(gfx);
  
  myAsciiArt.typeArray2d(ascii_arr, this);

  tint(255, pow(1.0 - (cyclic_t % 1.0), 4) * 255);

  image(images[floor(cyclic_t)], 0, 0, width, height);


  noTint();

  textSize(35)

  fill(0, 255, 255);
  text(currentCaption, 900, 50);

  textSize(10);
  fill(255, 255, 255);


  let timeSinceLastChange = millis() - lastChange;
  if (timeSinceLastChange >= changeInterval) {
    let captionIndex;
    do {
      captionIndex = floor(random(captions.length));
    } while (captionIndex === prevCaptionIndex) {
      prevCaptionIndex = captionIndex;
      currentCaption = captions[captionIndex];
      lastChange = millis();
    }
  }

}

function mouseReleased() {
  /*
    If you want to export the generated ASCII graphics, you can use the built-in
    function convert2dArrayToString() to convert the array of glyphs to a string.
  */
  console.log(myAsciiArt.convert2dArrayToString(ascii_arr));
}

typeArray2d = function (_arr2d, _dst, _x, _y, _w, _h) {
  if (_arr2d === null) {
    console.log('[typeArray2d] _arr2d === null');
    return;
  }
  if (_arr2d === undefined) {
    console.log('[typeArray2d] _arr2d === undefined');
    return;
  }
  switch (arguments.length) {
    case 2: _x = 0; _y = 0; _w = width; _h = height; break;
    case 4: _w = width; _h = height; break;
    case 6: /* nothing to do */ break;
    default:
      console.log(
        '[typeArray2d] bad number of arguments: ' + arguments.length
      );
      return;
  }

  /*
    Because Safari in macOS seems to behave strangely in the case of multiple
    calls to the p5js text(_str, _x, _y) method for now I decided to refer
    directly to the mechanism for handling the canvas tag through the "pure"
    JavaScript.
  */
  if (_dst.canvas === null) {
    console.log('[typeArray2d] _dst.canvas === null');
    return;
  }
  if (_dst.canvas === undefined) {
    console.log('[typeArray2d] _dst.canvas === undefined');
    return;
  }
  var temp_ctx2d = _dst.canvas.getContext('2d');
  if (temp_ctx2d === null) {
    console.log('[typeArray2d] _dst canvas 2d context is null');
    return;
  }
  if (temp_ctx2d === undefined) {
    console.log('[typeArray2d] _dst canvas 2d context is undefined');
    return;
  }
  var dist_hor = _w / _arr2d.length;
  var dist_ver = _h / _arr2d[0].length;
  var offset_x = _x + dist_hor * 0.5;
  var offset_y = _y + dist_ver * 0.5;
  for (var temp_y = 0; temp_y < _arr2d[0].length; temp_y++)
    for (var temp_x = 0; temp_x < _arr2d.length; temp_x++)
      /*text*/temp_ctx2d.fillText(
      _arr2d[temp_x][temp_y],
      offset_x + temp_x * dist_hor,
      offset_y + temp_y * dist_ver
    );
}
