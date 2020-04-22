// Define how to calculate the next field:
// Got some code from: http://rosettacode.org/wiki/Conway's_Game_of_Life
var nextGen = function(board) {
	// Create a new board (empty)
	var boardNext = new Array(board.length);
	for (var i = 0; i < board.length; i++) {
		boardNext[i] = new Array(board[i].length);
	}

	// For every cell in the old board
	for (var x = 0; x < board.length; x++) {
		for (var y = 0; y < board[x].length; y++) {

			// Check how many alive cells surround it
			var n = 0;
			for (var dx = -1; dx <= 1; dx++) {
				for (var dy = -1; dy <= 1; dy++) {
					// We wrap around the edges - helps keep us alive
					var xcoordinate = (x+dx + board.length) % board.length;
					var ycoordinate = (y+dy + board[xcoordinate].length) % board[xcoordinate].length;
					if ( dx == 0 && dy == 0){}
					else if (board[xcoordinate][ycoordinate]) {
						n++;
					}
				}	
			}

			// Check whether it should die/live/stay as-is
			c = board[x][y];
			c_old = c;
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

	return {
		board: boardNext.slice()
	};
}

//===================================

var canvas = document.getElementById("world");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = document.documentElement.scrollHeight;

// Define the size of a block, and calculate how large the world is
var width = 9;
var space = 4;
var numX = (ctx.canvas.width - space)/(width + space) | 0;
var numY = ctx.canvas.height/(width + space) | 0;
var refreshTime = 250;

// Define colors of life and dead cells
var colors = [
	"#dddddd", // Dead
	"#88cc88", // Newly alive
	"#55aa55",
	"#116611",
	"#004400" // Old alive
];

// The window width may not perfectly fit - use an offset when drawing to centre our cells
var xOffset = (ctx.canvas.width - space) % (width + space) / 2;
function set(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x*(width+space) + space + xOffset, y*(width+space)+space, width, width);
}

// Draw those blocks
for(var i = 0; i < numX; i++) {
	for(var j = 0; j < numY; j++) {
		set(i, j, colors[0]);
	}
}

// Create a board
var gameBoard = [];
for(var x = 0; x < numX; x++) {
	gameBoard[x] = [];
	for(var y = 0; y < numY; y++) {
		gameBoard[x][y] = 0;
	}
}

// OR's shape into gameBoard
var addShape = function(shape, offsetX, offsetY) {
	for(var y = 0; y < shape.length && (y+offsetY)<numY; y++) {
		for(var x = 0; x < shape[y].length && (x+offsetX) < numX; x++) {
			// Undefined is 0
			gameBoard[(x + offsetX + numX) % numX][(y + offsetY + numY) % numY] = (shape[y][x] === 1) ? 1 : 0;
		}
	}
};

// Flips a matrix (bottom to top)
var flipVertical = function(arr) {
	return arr.reverse();
};

// Flips a matrix (left right)
var flipHorizontal = function(arr) {
	var output = [];
	for(var i = 0; i < arr.length; i++) {
		output[i] = arr[i].slice().reverse();
	}
	return output;
}

var transpose = function(arr) {
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
	Define some shapes
*/
var glider = [
	[ , 1,  ],
	[ ,  , 1],
	[1, 1, 1]
];

var gosperGlidingGun = [
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

var lightweightSpaceship = [
	[1, , ,1,0],
	[ , , , ,1],
	[1, , , ,1],
	[ ,1,1,1,1]
];

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

// http://www.conwaylife.com/forums/viewtopic.php?f=2&t=2057
// C/10 spaceship
var c10 = [
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

var random = function(sizex, sizey, oneFraction) {
	var output = [];

	for(var y = 0; y < sizey; y++) {
		output[y] = [];
		for(var x = 0; x < sizex; x++) {

			output[y][x] = (Math.random() < oneFraction) ? 1 : 0;
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

/*
	Add shapes to the gameboard
*/
addShape(glider, 100, 0);
addShape(glider, 50, numY-10);
// addShape(flipVertical(glider), 40, 20);

addShape(gosperGlidingGun, 5, 5);
addShape(flipVertical(gosperGlidingGun), 9, 60);

addShape(lightweightSpaceship, 11, 22);
addShape(flipHorizontal(lightweightSpaceship), numX - 100, 28);
addShape(lightweightSpaceship, 12, 34);

addShape(transpose(lightweightSpaceship), numX-10, numY-10);
addShape(flipVertical(transpose(lightweightSpaceship)), numX-30, 10);

addShape(transpose(lightweightSpaceship), numX-10, 10);
addShape(transpose(lightweightSpaceship), numX-20, 30);
addShape(nextGen(transpose(lightweightSpaceship)), numX-20, 40);
addShape(flipHorizontal(transpose(lightweightSpaceship)), numX-30, 25);

addShape(c10, numX - 30, numY/2 | 0);

addShape(flipHorizontal(gosperGlidingGun), numX - 60, numY - 20);

addShape(rosetta, 10, 85);
addShape(gosperGlidingGun, 14, 85 + rosetta.length + 20);
addShape(rosetta, rosetta[0].length + 22, 142);

var iteration = 0;
var interval = setInterval(function() {
	next = nextGen(gameBoard);
	gameBoard = next.board;

	for(var x = 0; x < gameBoard.length; x++) {
		for(var y = 0; y < gameBoard[x].length; y++) {

			var colorId = Math.min(colors.length - 1, gameBoard[x][y]);
			set(x, y, colors[colorId]);
		}
	}

	iteration++;
}, refreshTime);
