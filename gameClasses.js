class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Size {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
}

class Ball {
	constructor(location, radius, color) {
		this.location = location;
		this.radius = radius;
		this.color = color;
		this.ySpeed = 0;
	}
	
	draw(canvasContext) {
		canvasContext.beginPath();
		canvasContext.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
		canvasContext.fillStyle = this.color;
		canvasContext.fill();
		canvasContext.strokeStyle = this.color;
		canvasContext.stroke();
	}
}

class Tube {
	constructor(location, size, color) {
		this.location = location;
		this.size = size;
		this.color = color;
	}
	
	draw(canvasContext) {
		canvasContext.beginPath();
		canvasContext.rect(this.location.x, this.location.y, this.size.width, this.size.height);
		canvasContext.fillStyle = this.color;
		canvasContext.fill();
		canvasContext.strokeStyle = this.color;
		canvasContext.stroke();
	}
}

class TubesSegment {
	constructor(tubesXLocation, tubesWidth, holeYLocation, holeHeight, tubesColor, canvasHeight) {
		this.topTube = new Tube(new Point(tubesXLocation, 0), new Size(tubesWidth, holeYLocation), tubesColor);
		this.bottomTube = new Tube(new Point(tubesXLocation, holeYLocation + holeHeight), new Size(tubesWidth, canvasHeight - (holeYLocation + holeHeight)), tubesColor);
	}
	
	draw(canvasContext) {
		this.topTube.draw(canvasContext);
		this.bottomTube.draw(canvasContext);
	}
	
	getTubesXLocation() {
		return this.topTube.location.x;
	}
	
	getTubesWidth() {
		return this.topTube.size.width;
	}
	
	moveTubes(xMoveAmount) {
		this.topTube.location.x += xMoveAmount;
		this.bottomTube.location.x += xMoveAmount;
	}
}

class LimitedArray {
	constructor(limitAmount) {
		this.limitAmount = limitAmount;
		this.array = [];
	}
	
	add(value) {
		if (this.array.length >= this.limitAmount)
			this.array.shift();
		this.array.push(value);
	}
	
	get(index) {
		return this.array[index];
	}
	
	getFirst() {
		return this.array[0];
	}
	
	getLast() {
		return this.array[this.limitAmount - 1];
	}
}
