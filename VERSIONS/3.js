var mySound;
var fft;
var img;

var	newZoom,
	newInverted,
	newSpikeLength;

var circleSize = 250;
var spikeLength = 1024 / 9;
var attraction = 400;
var rotateSpeed = 500; //Bigger, slower
var inverted = -1; // -1 = inverted, 1 = normal
var zoom = 1;

var particle = function(X, Y, C) {
	this.startPos = createVector(X, Y);
	this.pos = createVector(X, Y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);

	this.col = C;
	this.s = 5;
}

particle.prototype.draw = function() {
	fill(this.col);
	ellipse(this.pos.x, this.pos.y, this.s, this.s);
}

particle.prototype.update = function() {
	
	var f = p5.Vector.sub(this.startPos, this.pos);
	// console.log(this.startPos);

	var m = sq(f.mag());
	f.setMag(m);
	this.addForce(f.mult(attraction));

	
	this.vel.add(this.acc);
	this.vel.limit(3);
	this.pos.add(this.vel);
	this.acc.mult(0);
}

particle.prototype.addForce = function(force) {
	this.acc.add(force);
}

var particles = [];



function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('SONGS/song8.mp3'); // <------- THIS IS THE ONE FOR THE SONG
  fft = new p5.FFT();
  colorMode(HSL);
  // img = loadImage('img.jpg'); // <----- CHANGE THIS ONE. DON"T TOUCH ANYTHING ELSE
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  mySound.setVolume(0.1);
  mySound.play();
  noStroke();
  angleMode(RADIANS);
  // frameRate(1);
  for (var i = 0; i < 1024; i++) {
  	var angle = TWO_PI*i/1024;
	particles.push(new particle(circleSize * cos(angle), circleSize * sin(angle), color(map(i, 0, 1023, 0, 255), 100, 70, 0.9)));
  }
  spikeLength = round(spikeLength);

  newInverted = createSlider(-1,1,inverted, 2);
  newZoom = createSlider(0,2,zoom, 0.02);
  newSpikeLength = createSlider(2, 75, spikeLength);
  newSpikeLength.style('width', '320px');
}

function draw() {
	if (newInverted.value() != inverted) {
		inverted = newInverted.value();
	}
	if (newZoom.value() != zoom) {
		zoom = newZoom.value();
	}
	if (newSpikeLength.value() != spikeLength) {
		spikeLength = round(1024 / newSpikeLength.value());
	}

	background(0);
	// console.log(circleSize);
	var spectrum = fft.analyze();
	
	push();
	translate(width/2, height/2);
	scale(zoom);
	rotate(-frameCount / rotateSpeed);

	for (var i = 0; i < particles.length; i++) {
		var p = particles[i].pos.copy();
		var f = p.normalize().mult(spectrum[i % spikeLength]).mult(2);
		var f2 = f.mult(sq(f.mag()) * f.mag() / 1500);
		particles[i].vel.add(f2.mult(inverted));
		particles[i].update();
		particles[i].draw();
	}

	fill(0);
	ellipse(0, 0, 15, 15);
	pop();
}