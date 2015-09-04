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
			switch (n) {
				case 0: // Die -> alone
				case 1:
					c = 0;
					break;
				case 2: // Stay as you are
					if(c > 0) {
						c++;
					}
					break; 
				case 3: // Become alive
					c++;
					break;
				default: // Die -> overcrowded
					c = 0;
			}
			boardNext[x][y] = c;
		}
	}

	return boardNext.slice();
}

//===================================

var canvas = document.getElementById("world");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Get some basic sizes
var width = 8;
var space = 5;
var numX = ctx.canvas.width/(width + space) | 0;
var numY = ctx.canvas.height/(width + space) | 0;
var refreshTime = 200;

// Define colors of life and dead cells
var colors = [
	"#dddddd", // Dead
	"#88cc88", // Newly alive
	"#55aa55",
	"#116611",
	"#004400" // Old alive
];

function set(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x*(width+space)+space, y*(width+space)+space, width, width);
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
			gameBoard[x + offsetX][y + offsetY] = (shape[y][x] === 1) ? 1 : 0;
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

var transpose = function(arr){
	var output = [];
	for(var i = 0; i < arr[0].length; i++) {
		output[i] = [];
	}

	for(var x = 0; x < arr.length; x++) {
		for(var y = 0; y < arr[x].length; y++) {
			output[y][x] = arr[x][y];
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
	[ , , , , , , , , , , , , , , , , , , , , , , , ,1, , , , , , , , , , , ],
	[ , , , , , , , , , , , , , , , , , , , , , ,1, ,1, , , , , , , , , , , ],
	[ , , , , , , , , , , , ,1,1, , , , , , ,1,1, , , , , , , , , , , , ,1,1],
	[ , , , , , , , , , , ,1, , , ,1, , , , ,1,1, , , , , , , , , , , , ,1,1],
	[1,1, , , , , , , , ,1, , , , , ,1, , , ,1,1, , , , , , , , , , , , , , ],
	[1,1, , , , , , , , ,1, , , ,1, ,1,1, , , , ,1, ,1, , , , , , , , , , , ],
	[ , , , , , , , , , ,1, , , , , ,1, , , , , , , ,1, , , , , , , , , , , ],
	[ , , , , , , , , , , ,1, , , ,1, , , , , , , , , , , , , , , , , , , , ],
	[ , , , , , , , , , , , ,1,1, , , , , , , , , , , , , , , , , , , , , , ]
];

var lightweightSpaceship = [
	[1, , ,1,0],
	[ , , , ,1],
	[1, , , ,1],
	[ ,1,1,1,1]
];

/*
	Add shapes to the gameboard
*/
addShape(glider, 100, 0);
addShape(glider, 50, numY-10);
addShape(flipVertical(glider), 40, 20);

addShape(gosperGlidingGun, 5, 5);
addShape(flipVertical(gosperGlidingGun), 9, 60);

addShape(lightweightSpaceship, 11, 22);
addShape(flipHorizontal(lightweightSpaceship), numX - 100, 28);
addShape(lightweightSpaceship, 12, 34);

addShape(transpose(lightweightSpaceship), numX-10, numY-10)
addShape(flipVertical(transpose(lightweightSpaceship)), numX-30, numY-10)

var iteration = 0;
var interval = setInterval(function() {
	gameBoard = nextGen(gameBoard);

	for(var x = 0; x < gameBoard.length; x++) {
		for(var y = 0; y < gameBoard[x].length; y++) {

			var colorId = Math.min(colors.length - 1, gameBoard[x][y]);
			set(x, y, colors[colorId]);
		}
	}

	iteration++;
}, refreshTime);
