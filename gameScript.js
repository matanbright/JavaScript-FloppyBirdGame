const BALL_COLOR = "red";
const BALL_RADUIS = 10;
const BALL_INITIAL_LOCATION = new Point(200, 300);
const GRAVITY = 1;
const TIMER_INTERVAL = 20;
const TUBES_SEGMENTS_WIDTH = 50;
const FIRST_TUBES_SEGMENT_INITIAL_X_LOCATION = 600;
const TUBES_SEGMENTS_HOLE_HEIGHT = 200;
const TUBES_SEGMENTS_MARGIN = 500;
const TUBES_SEGMENTS_ARRAY_LIMIT_AMOUNT = 10;
const TUBES_SEGMENTS_X_SPEED = -5;
const BALL_CLICK_SPEED_BOOST = -13;

var canvas;
var canvasContext;
var gameInProgress;
var ball;
var tubesSegmentsArray;


initialize();




function initialize() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	gameInProgress = false;
	ball = new Ball(BALL_INITIAL_LOCATION, BALL_RADUIS, BALL_COLOR);
	ball.draw(canvasContext);
	
	tubesSegmentsArray = new LimitedArray(TUBES_SEGMENTS_ARRAY_LIMIT_AMOUNT);
	for (i = 0; i < TUBES_SEGMENTS_ARRAY_LIMIT_AMOUNT; i++) {
		tubesSegmentsArray.add(new TubesSegment(FIRST_TUBES_SEGMENT_INITIAL_X_LOCATION + i * TUBES_SEGMENTS_MARGIN, TUBES_SEGMENTS_WIDTH, getRandomInt(0, canvas.height - TUBES_SEGMENTS_HOLE_HEIGHT), TUBES_SEGMENTS_HOLE_HEIGHT, "black", canvas.height));
		tubesSegmentsArray.get(i).draw(canvasContext);
	}
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


canvas.addEventListener("click", function() {
	ball.ySpeed = BALL_CLICK_SPEED_BOOST;
	gameInProgress = true;
});


window.setInterval(function() {
	if (gameInProgress) {
		if (ball.location.y - ball.radius <= 0) {
			ball.location.y = ball.radius;
			ball.ySpeed = 0;
		} else if (ball.location.y + ball.radius >= canvas.height) {
			alert("Game over!");
			initialize();
		}
		
		ball.ySpeed += GRAVITY;
		ball.location.y += ball.ySpeed;
		
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		ball.draw(canvasContext);
		
		
		
		
		for (i = 0; i < TUBES_SEGMENTS_ARRAY_LIMIT_AMOUNT; i++) {
			if (((ball.location.x + ball.radius >= tubesSegmentsArray.get(i).topTube.location.x && ball.location.x - ball.radius <= tubesSegmentsArray.get(i).topTube.location.x + tubesSegmentsArray.get(i).topTube.size.width) &&
			   (ball.location.y + ball.radius >= tubesSegmentsArray.get(i).topTube.location.y && ball.location.y - ball.radius <= tubesSegmentsArray.get(i).topTube.location.y + tubesSegmentsArray.get(i).topTube.size.height)) ||
			   (ball.location.x + ball.radius >= tubesSegmentsArray.get(i).bottomTube.location.x && ball.location.x - ball.radius <= tubesSegmentsArray.get(i).bottomTube.location.x + tubesSegmentsArray.get(i).bottomTube.size.width) &&
			   (ball.location.y + ball.radius >= tubesSegmentsArray.get(i).bottomTube.location.y && ball.location.y - ball.radius <= tubesSegmentsArray.get(i).bottomTube.location.y + tubesSegmentsArray.get(i).bottomTube.size.height)) {
				alert("Game over!");
				initialize();
			}
			
			tubesSegmentsArray.get(i).moveTubes(TUBES_SEGMENTS_X_SPEED);
			tubesSegmentsArray.get(i).draw(canvasContext);
		}
		
		for (i = 0; i < TUBES_SEGMENTS_ARRAY_LIMIT_AMOUNT; i++) {
			tubesSegmentsArray.get(i).moveTubes(TUBES_SEGMENTS_X_SPEED);
			tubesSegmentsArray.get(i).draw(canvasContext);
		}
		
		if (tubesSegmentsArray.getFirst().topTube.location.x + tubesSegmentsArray.getFirst().topTube.size.width < 0)
			tubesSegmentsArray.add(new TubesSegment(tubesSegmentsArray.getLast().getTubesXLocation() + tubesSegmentsArray.getLast().getTubesWidth() + TUBES_SEGMENTS_MARGIN, TUBES_SEGMENTS_WIDTH, getRandomInt(0, canvas.height - TUBES_SEGMENTS_HOLE_HEIGHT), TUBES_SEGMENTS_HOLE_HEIGHT, "black", canvas.height));
	}
}, TIMER_INTERVAL);
