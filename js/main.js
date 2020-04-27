/*
In the beginning, there was time.
*/
const period = 250; // ms

/*
Create a canvas to draw our world on.
*/
const canvas = new Canvas();
canvas.init();

const world = new World(canvas.width, canvas.height);

// Init life
for (var i = 0; i < 8; i++) {
	world.addShape(Pattern.glider.flipHorizontal(),  canvas.width / 2 | 0, 10 * i);	
}

world.addShape(Pattern.gosperGlidingGun, 5, 5);

if (canvas.width > (Pattern.gosperGlidingGun.width * 2 + 10)) {
	world.addShape(Pattern.gosperGlidingGun.flipHorizontal(), canvas.width - Pattern.gosperGlidingGun.width - 5, 10);
}

// Two spaceships, passing by
world.addShape(Pattern.lightweightSpaceship, 11, 22);
world.addShape(Pattern.lightweightSpaceship.flipHorizontal(),  canvas.width - Pattern.lightweightSpaceship.width, 22 + Pattern.lightweightSpaceship.height + 2);

// 1/3rd down
// Two lines of spaceships, travelling in opposite directions.
var flipped = true;
for (var i = 0; (i + Pattern.lightweightSpaceship.width) < canvas.width; i += (Pattern.lightweightSpaceship.width + 4)) {
	// Flip top/bottom
	var directedSpaceship = flipped ? Pattern.lightweightSpaceship.flipVertical() : Pattern.lightweightSpaceship;
	world.addShape(directedSpaceship, i, (canvas.height / 3) | 0);

	directedSpaceship = flipped ? Pattern.lightweightSpaceship.flipVertical() : Pattern.lightweightSpaceship;
	world.addShape(directedSpaceship.flipHorizontal(),
		canvas.width - i,
		((canvas.height / 3) + Pattern.lightweightSpaceship.height + 4) | 0); // A bit further down, with a little space in between

	flipped = !flipped;
}
world.addShape(Pattern.lightweightSpaceship, (canvas.width / 3) | 0, (canvas.height / 3) | 0);
world.addShape(Pattern.lightweightSpaceship.flipHorizontal().flipVertical(), (2 * canvas.width / 3) | 0, (canvas.height / 3) | 0);

// Rosetta ~in the middle
world.addShape(Pattern.rosetta, ( canvas.width - Pattern.rosetta.width)/2 | 0, ( canvas.height - Pattern.rosetta.height)/2 | 0);

world.addShape(Pattern.gosperGlidingGun.flipHorizontal(), ( canvas.width/2 | 0), ( canvas.height/2 | 0) + 50);

// At 2/3rds down, two c10's on opposite sides
world.addShape(Pattern.c10, 2, (2 *  canvas.height/3) | 0);
world.addShape(Pattern.c10,  canvas.width - Pattern.c10.width - 2, (2 *  canvas.height/3) | 0);

world.addShape(Pattern.conway, 4,  canvas.height - Pattern.conway.height - 2);

// Redraw to get all shapes without waiting an interval
canvas.drawWorld(world.getCells())

// Time
var interval = setInterval(function() {
	world.nextGen();
	canvas.drawWorld(world.getCells());
}, period);

// This part isn't great... but resizing needs to be handled somehow :/
var resizeTimer; // To not trigger too many times
window.onresize = function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		console.log("Detected resizing!");
		canvas.init();
		world.resize(canvas.width, canvas.height);
		canvas.drawWorld(world.getCells());
	}, 250);
};
