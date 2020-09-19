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

QUnit.test("Evolution left/right-leaning'", function( assert ) {

	/*
	 *  0 0 0      0 0 0
	 *   0 1 0      1 0 0
	 *  0 1 0   => 0 2 0
	 *   0 1 0      1 0 0
	 *  0 0 0      0 0 0
	 */
	const start = new Pattern([
		[ , , , , ,0],
		[ ,1,1,1, ,0],
		[ , , , , ,0],
		[ , , , , ,0]
	].map(row => undefinedsToZero(row))); // convert undefined to 0

	const world = new World(4, 5)
		.addShape(start, 0, 0);
	
	const first = [
		[ ,1, ,1,0],
		[ , ,2, ,0],
		[ , , , ,0],
		[ , , , ,0]
	].map(row => undefinedsToZero(row)); // convert undefined to 0
	world.nextGen();
	assert.deepEqual( world.getCells(), first, "Verifying first iteration" );


	/*
	 *  Next iteration we're back at the start, except our stable cell is now gen 3
	 *
	 *  0 0 0      0 0 0      0 0 0
	 *   0 1 0      1 0 0      0 1 0
	 *  0 1 0   => 0 2 0   => 0 3 0
	 *   0 1 0      1 0 0      0 1 0
	 *  0 0 0      0 0 0      0 0 0
	 */

	const second = [
		[ , , , ,0],
		[ ,1,3,1,0],
		[ , , , ,0],
		[ , , , ,0]
	].map(row => undefinedsToZero(row)); // convert undefined to 0

	world.nextGen();
	assert.deepEqual( world.getCells(), second, "Verifying second iteration" );

});
