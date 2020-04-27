const undefinedsToZero = function(arr) {
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i] = (typeof arr[i]) == "number" ? arr[i] : 0;
	}
	return arr;
}

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

QUnit.test("Evolution of a glider", function( assert ) {
	const world = new World(5, 5)
		.addShape(Pattern.glider, 0, 0);
	
	const start = [
		[ , ,1, ,0],
		[1, ,1, ,0],
		[ ,1,1, ,0],
		[ , , , ,0],
		[ , , , ,0]
	].map(row => undefinedsToZero(row)); // convert undefined to 0
	assert.deepEqual( world.getCells(), start, "Verifying start position" );

	const first = [
		[ ,1, , ,0],
		[ , ,2,1,0],
		[ ,2,2, ,0],
		[ , , , ,0],
		[ , , , ,0]
	].map(row => undefinedsToZero(row)); // convert undefined to 0
	world.nextGen();
	assert.deepEqual( world.getCells(), first, "Verifying first iteration" );

	const second = [
		[ , ,1, ,0],
		[ , , ,2,0],
		[ ,3,3,1,0],
		[ , , , ,0],
		[ , , , ,0]
	].map(row => undefinedsToZero(row)); // convert undefined to 0
	world.nextGen();
	assert.deepEqual( world.getCells(), second, "Verifying second iteration" );

	const third = [
		[ , , , ,0],
		[ ,1, ,3,0],
		[ , ,4,2,0],
		[ , ,1, ,0],
		[ , , , ,0]
	].map(row => undefinedsToZero(row)); // convert undefined to 0
	world.nextGen();
	assert.deepEqual( world.getCells(), third, "Verifying third iteration" );
});
