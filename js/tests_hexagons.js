const undefinedsToZero = function(arr) {
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i] = (typeof arr[i]) == "number" ? arr[i] : 0;
	}
	return arr;
}

// These matrices should be transposed (i.e. flipped 90 degrees), to
// match how they get rendered.

// Arrays have an extra space indentation, to show how the hexagon
// rows align. Even numbered rows are half a hexagon "lower".

QUnit.test("Empty world", function( assert ) {
	const actual = new World(4, 5).getCells();
	const expected = [
		 [0,0,0,0,0],
		[0,0,0,0,0],
		 [0,0,0,0,0],
		[0,0,0,0,0]
	];

	assert.deepEqual( actual, expected );
});

QUnit.test("World with glider", function( assert ) {
	const actual = new World(4, 5)
		.addShape(Pattern.glider, 1, 2)
		.getCells();
	const expected = [
		 [0,0,0,0,0],
		[0,0,0,0,1],
		 [0,0,1,0,1],
		[0,0,0,1,1]
	];

	assert.deepEqual( actual, expected );
});

QUnit.test("Get/set fields", function( assert ) {
	const world = new World(4, 5);

	for(var x = 0; x < 10; x++) {
		for(var y = 0; y < 10; y++) {
			var c = 10*x + y;
			world.setCell(x, y, c);
			assert.strictEqual( world.getCell(x, y), c );
		}
	}
});

QUnit.test("Evolution - looking 'up'", function( assert ) {
	const start = new Pattern([
		 [ , , , ,0], // should look 'up', so first one here should become alive (and 2nd too)
		[1,1,1, ,0],
		 [ , , , ,0],
		[ , , , ,0]
	].map(row => undefinedsToZero(row))); // convert undefined to 0

	const world = new World(4, 5)
		.addShape(start, 0, 0);
	
	const first = [
		 [1,1, , ,0],
		[ ,2, , ,0],
		 [1,1, , ,0],
		[ , , , ,0]
	].map(row => undefinedsToZero(row)); // convert undefined to 0
	world.nextGen();
	assert.deepEqual( world.getCells(), first, "Verifying first iteration" );
});


QUnit.test("Evolution - looking 'down'", function( assert ) {
	const start = new Pattern([
		 [ , , , ,0],
		[ , , , ,0], // should look 'up', so first one here should become alive (and 2nd too)
		 [1,1,1, ,0],
		[ , , , ,0],
		 [ , , , ,0]
	].map(row => undefinedsToZero(row))); // convert undefined to 0

	const world = new World(5, 5)
		.addShape(start, 0, 0);
	
	const first = [
		 [ , , , ,0],
		[ ,1,1, ,0],
		 [ ,2, , ,0],
		[ ,1,1, ,0],
		 [ , , , ,0]
	].map(row => undefinedsToZero(row)); // convert undefined to 0
	world.nextGen();
	assert.deepEqual( world.getCells(), first, "Verifying first iteration" );
});
