// define some shames
class Patterns {
	static get glider(){
		return [
			[ , 1,  ],
			[ ,  , 1],
			[1, 1, 1]
		];
	}

	static get gosperGlidingGun() {
		return [
			[ , , , , , , , , , , , , , , , , , , , , , , , ,1, , , , , , , , , , ,0],
			[ , , , , , , , , , , , , , , , , , , , , , ,1, ,1, , , , , , , , , , ,0],
			[ , , , , , , , , , , , ,1,1, , , , , , ,1,1, , , , , , , , , , , , ,1,1],
			[ , , , , , , , , , , ,1, , , ,1, , , , ,1,1, , , , , , , , , , , , ,1,1],
			[1,1, , , , , , , , ,1, , , , , ,1, , , ,1,1, , , , , , , , , , , , , ,0],
			[1,1, , , , , , , , ,1, , , ,1, ,1,1, , , , ,1, ,1, , , , , , , , , , ,0],
			[ , , , , , , , , , ,1, , , , , ,1, , , , , , , ,1, , , , , , , , , , ,0],
			[ , , , , , , , , , , ,1, , , ,1, , , , , , , , , , , , , , , , , , , ,0],
			[ , , , , , , , , , , , ,1,1, , , , , , , , , , , , , , , , , , , , , ,0]
		];
	}

	static get lightweightSpaceship(){
		return [
			[1, , ,1,0],
			[ , , , ,1],
			[1, , , ,1],
			[ ,1,1,1,1]
		];
	}
	
	static get rosetta() {
		// The top-left of the rosetta code
		var rosetta = [
			[1, , , , , , , , , , , , , , , , , , ,0],
			[ ,1, , , , , , , , , , , , , , , , , ,0],
			[ , ,1, , , , , , , , , , , , , , , , ,0],
			[ , , ,1, , , , , , , , , , , , , , , ,0],
			[ , , , ,1, , , , , , , , , , , , , , ,0],
			[ , , , , ,1, , , , , , , , , , , , , ,0],
			[ , , , , , ,1, , , , , , , , , , , , ,0],
			[ , , , , , , ,1, , , , , , , , , , , ,0],
			[ , , , , , , , ,1, , , , , , , , , , ,0],
			[ , , , , , , , , ,1, , , , , , , , , ,0],
			[ , , , , , , , , , ,1, , , , , , , , ,0],
			[ , , , , , , , , , , ,1, , , , , , , ,0],
			[ , , , , , , , , , , , ,1, , , , , , ,0],
			[ , , , , , , , , , , , , ,1, , , , , ,0],
			[ , , , , , , , , , , , , , ,1, , , , ,0],
			[ , , , , , , , , , , , , , , ,1, , , ,0],
			[ , , , , , , , , , , , , , , , ,1, , ,0],
			[ , , , , , , , , , , , , , , , , ,1,1,1],
			[ , , , , , , , , , , , , , , , , ,1,1,1],
			[ , , , , , , , , , , , , , , , , ,1,1,0]
		];

		// To get the full one, flip it a few times
		for(var i = 0; i < rosetta.length; i++) {
			for(var j = 0; j < rosetta[i].length; j++) {
				rosetta[i][j] = rosetta[i][j] === 1 ? 1 : 0;
			}
		}
		for(var i = 0; i < rosetta.length; i++) {
			rosetta[i] = rosetta[i].concat(rosetta[i].slice().reverse())
		};
		rosetta = rosetta.concat(rosetta.slice().reverse());
		return rosetta;
	}

	// http://www.conwaylife.com/forums/viewtopic.php?f=2&t=2057
	// C/10 spaceship
	static get c10(){
		return [
			[ , , , ,1,1, , , , ,0],
			[ , , ,1,1,1,1, , , ,0],
			[ , , , , , , , , , ,0],
			[ , ,1,1,1,1,1,1, , ,0],
			[ , , ,1,1,1,1, , , ,0],
			[ , , , , , , , , , ,0],
			[ , ,1,1, , ,1,1, , ,0],
			[1,1, ,1, , ,1, ,1,1,0],
			[ , , ,1, , ,1, , , ,0],
			[ , , , , , , , , , ,0],
			[ , , , , , , , , , ,0],
			[ , , , ,1,1, , , , ,0],
			[ , , , ,1,1, , , , ,0]
		];
	}
}

class World {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		// Initialize cells
		this.cells = new Array(width);
		for (var i = 0; i < width; i++) {
			this.cells[i] = new Array(length);
		}
	}

	nextGen() {
		// Create a new cells (empty)
		var boardNext = new Array(this.cells.length);
		for (var i = 0; i < this.cells.length; i++) {
			boardNext[i] = new Array(this.cells[i].length);
		}

		// For every cell in the old cells
		for (var x = 0; x < this.cells.length; x++) {
			for (var y = 0; y < this.cells[x].length; y++) {
				// Check how many alive cells surround it
				var n = 0;
				for (var dx = -1; dx <= 1; dx++) {
					for (var dy = -1; dy <= 1; dy++) {
						// We wrap around the edges - helps keep us alive
						var xcoordinate = (x+dx + this.cells.length) % this.cells.length;
						var ycoordinate = (y+dy + this.cells[xcoordinate].length) % this.cells[xcoordinate].length;
						if ( dx == 0 && dy == 0){}
						else if (this.cells[xcoordinate][ycoordinate]) {
							n++;
						}
					}	
				}

				// Check whether it should die/live/stay as-is
				var c = this.cells[x][y];
				switch (n) {
					case 0: // Die -> alone
					case 1: c = 0; break;
					case 2: if(c > 0) { c++; } break; // Stay as you were
					case 3: c++; break; // Become alive
					default: c = 0; // Die -> overcrowded
				}
				boardNext[x][y] = c;
			}
		}

		return this.cells = boardNext;
	}

	getCells() {
		return this.cells;
	}

	// OR's shape into gameBoard
	addShape(shape, offsetX, offsetY) {
		for(var y = 0; y < shape.length && (y+offsetY)<numY; y++) {
			for(var x = 0; x < shape[y].length && (x+offsetX) < numX; x++) {
				// Undefined is 0
				this.cells[(x + offsetX + numX) % this.width][(y + offsetY + numY) % this.height] = (shape[y][x] === 1) ? 1 : 0;
			}
		}
	};
}

//===================================

const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = document.documentElement.scrollHeight;

// Define the size of a block, and calculate how large the world is
const width = 9;
const space = 4;
const numX = (ctx.canvas.width - space)/(width + space) | 0;
const numY = ctx.canvas.height/(width + space) | 0;
const refreshTime = 250;

// Define colors of life and dead cells
var colors = [
	"#dddddd", // Dead
	"#88cc88", // Newly alive
	"#55aa55",
	"#116611",
	"#004400" // Old alive
];

// The window width may not perfectly fit - use an offset when drawing to centre our cells
var xOffset = (ctx.canvas.width - space) % (width + space) / 2 | 0;
function set(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x*(width+space) + space + xOffset, y*(width+space)+space, width, width);
}

// Draw the initial world
for(var i = 0; i < numX; i++) {
	for(var j = 0; j < numY; j++) {
		set(i, j, colors[0]);
	}
}

// Create a world to hold our cells
const world = new World(numX, numY);

// Flips a matrix (bottom to top)
var flipVertical = (arr) => arr.reverse();

// Flips a matrix (left right)
const flipHorizontal = (arr) => {
	var output = [];
	for(var i = 0; i < arr.length; i++) {
		output[i] = arr[i].slice().reverse();
	}
	return output;
}

const transpose = (arr) => {
	var output = [];
	fail = arr;

	for(var x = 0; x < arr[0].length; x++) {
		output[x] = [];

		for(var y = 0; y < arr.length; y++) {
			output[x][y] = arr[y][x];
		}
	}
	return output;
}

/*
Our coordinates are set as:
 ____________________________
| (0,0)            (0, numX) |
|                            |
|                            |
|                            |
| (numY, 0)     (numY, numX) |
|____________________________|
*/

var interval = setInterval(function() {
	world.nextGen();
	gameBoard = world.getCells();

	for(var x = 0; x < gameBoard.length; x++) {
		for(var y = 0; y < gameBoard[x].length; y++) {

			var colorId = Math.min(colors.length - 1, gameBoard[x][y]);
			set(x, y, colors[colorId]);
		}
	}
}, refreshTime);

// Init life
world.addShape(Patterns.glider, 100, 0);
world.addShape(Patterns.glider, 50, numY-10);

world.addShape(Patterns.gosperGlidingGun, 5, 5);
world.addShape(flipVertical(Patterns.gosperGlidingGun), 9, 60);

world.addShape(Patterns.lightweightSpaceship, 11, 22);
world.addShape(flipHorizontal(Patterns.lightweightSpaceship), numX - 100, 28);
world.addShape(Patterns.lightweightSpaceship, 12, 34);

world.addShape(transpose(Patterns.lightweightSpaceship), numX-10, numY-10);
world.addShape(flipVertical(transpose(Patterns.lightweightSpaceship)), numX-30, 10);

world.addShape(transpose(Patterns.lightweightSpaceship), numX-10, 10);
world.addShape(transpose(Patterns.lightweightSpaceship), numX-20, 30);
world.addShape(flipVertical(transpose(Patterns.lightweightSpaceship)), numX-20, 40);
world.addShape(flipHorizontal(transpose(Patterns.lightweightSpaceship)), numX-30, 25);

world.addShape(Patterns.c10, numX - 30, numY/2 | 0);

world.addShape(flipHorizontal(Patterns.gosperGlidingGun), numX - 60, numY - 20);

world.addShape(Patterns.rosetta, 10, 85);
world.addShape(Patterns.gosperGlidingGun, 14, 85 + Patterns.rosetta.length + 20);
world.addShape(Patterns.rosetta, Patterns.rosetta[0].length + 22, 142);
