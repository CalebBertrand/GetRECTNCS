var mySound;
var fft;
var img;

var w;

var c = 150;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('SONGS/song4.mp3'); // <------- THIS IS THE ONE FOR THE SONG
  fft = new p5.FFT();
  colorMode(HSL);
  w = TWO_PI;
  img = loadImage('img.jpg'); // <----- CHANGE THIS ONE. DON"T TOUCH ANYTHING ELSE
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  mySound.setVolume(0.2);
  mySound.play();
  noStroke();
}

function draw() {
	// background(255, 255, 255);
	image(img, 0, 0, width, height);
	var spectrum = fft.analyze();
	
	push();
	translate(width/2, height/2);
	for (var i = 0; i < width/w; i++) {
		fill(map(i, 0, width/w - 1, 0, 255), 100, 70, 0.9);
		rotate(TWO_PI / (width/w) * i);
		rect(-w/2, c, w, spectrum[i]);
	}
	fill(255, 255, 255, 0.75);
	ellipse(0, 0, 300, 300);
	pop();
}