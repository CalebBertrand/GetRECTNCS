var mySound;
var fft;
var img;

var w = 4;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('SONGS/song3.mp3');
  fft = new p5.FFT();
  colorMode(HSL);

  img = loadImage('img.jpg');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  mySound.setVolume(0.2);
  mySound.play();
}

function draw() {
	background(0);
	image(img, 0, 0, width, height);
	var spectrum = fft.analyze();
	noStroke();
	// console.log(spectrum.length);
	for (var i = 0; i < width/w; i++) {
		fill(map(i, 0, width/w - 1, 0, 255), 100, 70, 0.3);
		rect(i * w, height, w, -spectrum[i]*2);
	}
}