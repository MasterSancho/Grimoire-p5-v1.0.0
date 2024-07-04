function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
}

function draw() {
	background(255);
	fill(0);
	noStroke();
	ellipse(mouseX, mouseY, 50, 50);
}

let shapeType = 'circle';
let shapeColor;
let shapeSize = 50;
let color1, color2, lerpValue;
let angle = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	shapeColor = color(0);
	changeColors(); // Initialize the colors
	lerpValue = 0;
	setInterval(changeColors, 3000); // Change colors every 3 seconds
}

function draw() {
	setGradient(0, 0, width, height, color1, color2, lerpValue);
	lerpValue += 0.01;
	if (lerpValue > 1) lerpValue = 0;

	let x = constrain(mouseX, shapeSize / 2, width - shapeSize / 2);
	let y = constrain(mouseY, shapeSize / 2, height - shapeSize / 2);

	fill(shapeColor);
	noStroke();

	push();
	translate(x, y);
	rotate(angle);
	if (shapeType === 'circle') {
		ellipse(0, 0, shapeSize, shapeSize);
	} else if (shapeType === 'rectangle') {
		rect(-shapeSize / 2, -shapeSize / 2, shapeSize, shapeSize);
	} else if (shapeType === 'triangle') {
		triangle(
			0,
			-shapeSize / 2,
			-shapeSize / 2,
			shapeSize / 2,
			shapeSize / 2,
			shapeSize / 2
		);
	}
	pop();

	angle += 0.05;
}

function changeColors() {
	color1 = color(random(255), random(255), random(255));
	color2 = color(random(255), random(255), random(255));
}

function setGradient(x, y, w, h, c1, c2, amt) {
	let interA = lerpColor(c1, c2, amt);
	let interB = lerpColor(c2, c1, amt);
	for (let i = y; i <= y + h; i++) {
		let inter = lerpColor(interA, interB, map(i, y, y + h, 0, 1));
		stroke(inter);
		line(x, i, x + w, i);
	}
}

function mousePressed() {
	shapeColor = color(random(255), random(255), random(255));
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		shapeSize += 10;
	} else if (keyCode === DOWN_ARROW) {
		shapeSize -= 10;
	} else if (key === 'C') {
		shapeType = 'circle';
	} else if (key === 'R') {
		shapeType = 'rectangle';
	} else if (key === 'T') {
		shapeType = 'triangle';
	}
}
