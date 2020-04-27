// define some shames
class Pattern {
	constructor(cells) {
		this.cells = cells.map(
			row => row.map(
				cell => (cell === 1) ? 1 : 0));
	}

	// Flips a matrix (bottom/top)
	flipVertical() {
		var flipped = [];
		for(var i = 0; i < this.cells.length; i++) {
			flipped[i] = this.cells[i].slice().reverse();
		}
		return new Pattern(flipped);
	}

	// Flips a matrix (left/right)
	flipHorizontal() {
		return new Pattern(this.cells.slice().reverse());
	}

	transpose() {
		var transposed = [];

		for(var x = 0; x < this.cells[0].length; x++) {
			transposed[x] = [];
			for(var y = 0; y < this.cells.length; y++) {
				transposed[x][y] = this.cells[y][x];
			}
		}

		return new Pattern(transposed);
	}

	getCells() {
		return this.cells.slice().map(row => row.slice());
	}

	get width() {
		return this.cells.length;
	}

	get height() {
		return this.cells[0].length;
	}

	/*
	A number of well-known patterns.
	Transposed before returning, so their orientation in code matches the result on-screen
	(due to flipping of x/y coordinates in array literals)
	*/
	static get glider() {
		return new Pattern([
			[ , 1, 0],
			[ ,  , 1],
			[1, 1, 1]
		]).transpose();
	}

	static get gosperGlidingGun() {
		return new Pattern([
			[ , , , , , , , , , , , , , , , , , , , , , , , ,1, , , , , , , , , , ,0],
			[ , , , , , , , , , , , , , , , , , , , , , ,1, ,1, , , , , , , , , , ,0],
			[ , , , , , , , , , , , ,1,1, , , , , , ,1,1, , , , , , , , , , , , ,1,1],
			[ , , , , , , , , , , ,1, , , ,1, , , , ,1,1, , , , , , , , , , , , ,1,1],
			[1,1, , , , , , , , ,1, , , , , ,1, , , ,1,1, , , , , , , , , , , , , ,0],
			[1,1, , , , , , , , ,1, , , ,1, ,1,1, , , , ,1, ,1, , , , , , , , , , ,0],
			[ , , , , , , , , , ,1, , , , , ,1, , , , , , , ,1, , , , , , , , , , ,0],
			[ , , , , , , , , , , ,1, , , ,1, , , , , , , , , , , , , , , , , , , ,0],
			[ , , , , , , , , , , , ,1,1, , , , , , , , , , , , , , , , , , , , , ,0]
		]).transpose();
	}

	static get lightweightSpaceship(){
		return new Pattern([
			[1, , ,1,0],
			[ , , , ,1],
			[1, , , ,1],
			[0,1,1,1,1]
		]).transpose();
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
		return new Pattern(rosetta);
	}

	// http://www.conwaylife.com/forums/viewtopic.php?f=2&t=2057
	// C/10 spaceship
	static get c10() {
		return new Pattern([
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
		]).transpose();
	}

	// John Conway
	// https://xkcd.com/2293/
	static get conway() {
		return new Pattern([
			[ , ,1,1,1, , ,0],
			[ , ,1, ,1, , ,0],
			[ , ,1, ,1, , ,0],
			[ , , ,1, , , ,0],
			[1, ,1,1,1, , ,0],
			[ ,1, ,1, ,1, ,0],
			[ , , ,1, , ,1,0],
			[ , ,1, ,1, , ,0],
			[ , ,1, ,1, , ,0]
		]).transpose();
	}
}

class World {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.cells = World.empty(width, height);
	}

	nextGen() {
		const boardNext = World.empty(this.width, this.height);

		// For every cell in the old cells
		for (var x = 0; x < this.cells.length; x++) {
			for (var y = 0; y < this.cells[x].length; y++) {
				// Check how many alive cells surround it
				var n = 0;
				for (var dx = -1; dx <= 1; dx++) {
					for (var dy = -1; dy <= 1; dy++) {
						if ( dx == 0 && dy == 0){
							// Don't count yourself - only the neighbours
						} else if (this.getCell(x + dx, y + dy) > 0) {
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

		this.cells = boardNext;
	}

	/*
	 Get the value of a cell.
	 Wrap around the edges so we don't keep killing life at the edge of the world.
	*/
	getCell(x, y) {
		const xmod = (x + this.cells.length) % this.cells.length;
		const ymod = (y + this.cells[xmod].length) % this.cells[xmod].length;
		const cell = this.cells[xmod][ymod];
		return cell;
	}

	setCell(x, y, val) {
		const xmod = x % this.cells.length;
		const ymod = y % this.cells[xmod].length;
		this.cells[xmod][ymod] = val;
	}

	getCells() {
		return this.cells;
	}

	// OR's shape into gameBoard
	addShape(shape, offsetX, offsetY) {
		const shapeCells = shape.getCells();

		for (var x = 0; x < shapeCells.length; x++) {
			for (var y = 0; y < shapeCells[x].length; y++) {
				this.setCell(offsetX + x, offsetY + y, (shapeCells[x][y] === 1) ? 1 : 0);
			}
		}

		return this;
	}

	resize(newWidth, newHeight) {
		const newWorld = World.empty(newWidth, newHeight);

		// If the world increased in size, align existing life to the centre.
		// It's a bit arbitrary since we overflow to either direction anyway so positions are 
		// meaningless, but I thought this looks nicer.
		const xOffset = (newWidth > this.width) ?
			(newWidth - this.width)/2 | 0 :
			0;

		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				newWorld[xOffset + x % newWidth][y % newHeight] = this.cells[x][y];
			}
		}

		this.width = newWidth;
		this.height = newHeight;
		this.cells = newWorld;
	}

	static empty(width, height) {
		return new Array(width)
			.fill(0)
			.map(() => new Array(height).fill(0));
	}
}

class Cell {
	// Define colors of life and dead cells
	static get colors() {
		return [
			"#dddddd", // Dead
			"#88cc88", // Newly alive
			"#55aa55",
			"#116611",
			"#004400" // Old alive
		];
	}

	static get width() {
		return 9;
	}

	static get space() {
		return 4;
	}
}

class Canvas {
	constructor() {
		this.canvas = document.getElementById("world");
		this.ctx = this.canvas.getContext("2d");
	}

	init() {
		this.ctx.canvas.width  = window.innerWidth;
		this.ctx.canvas.height = document.documentElement.scrollHeight;

		// Remove anything we may've drawn before
		this.clear();

		// Calculate how many cells wide/high our canvas is
		this.numX = (this.ctx.canvas.width - Cell.space)/(Cell.width + Cell.space) | 0;
		this.numY = this.ctx.canvas.height/(Cell.width + Cell.space) | 0;

		// To centre the cells, we may need an offset
		// Round to int (| 0) to avoid drawing any half-transparent pixels
		this.xOffset = (this.ctx.canvas.width - Cell.space) % (Cell.width + Cell.space) / 2 | 0;

		// Draw an empty world so we see the cells immediately
		this.drawWorld(World.empty(this.numX, this.numY));
	}

	get width() {
		return this.numX;
	}

	get height() {
		return this.numY;
	}

	// The window width may not perfectly fit - use an offset when drawing to centre our cells
	colorCell(x, y, color) {
		this.ctx.fillStyle = color;
		const xPos = x*(Cell.width+Cell.space) + Cell.space + this.xOffset;
		const yPos = y*(Cell.width+Cell.space) + Cell.space;
		this.ctx.fillRect(xPos, yPos, Cell.width, Cell.width);
	}

	drawWorld(world) {
		for(var x = 0; x < world.length; x++) {
			for(var y = 0; y < world[x].length; y++) {
				var colorId = Math.min(Cell.colors.length - 1, world[x][y]);
				this.colorCell(x, y, Cell.colors[colorId]);
			}
		}
	}

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}
}