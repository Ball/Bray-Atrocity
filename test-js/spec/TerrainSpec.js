describe("Terrain", function(){
	beforeEach(function(){
		this.terrain = new Terrain([{x:200, y:210}]);
	});
	it("returns false if you ask about a point it doesn't own", function(){
		expect(this.terrain.isColliding({x:100, y:100})).toBeFalsy();
	});
	it("returns true if you ask about the corner point", function(){
		expect(this.terrain.isColliding({x: 200, y:210})).toBeTruthy();
	});
	it("returns true if you ask about an internal point", function(){
		expect(this.terrain.isColliding({x: 205, y: 215})).toBeTruthy();
	});
	it("returns false if you ask about the opposing corner", function(){
		expect(this.terrain.isColliding({x:210, y:220})).toBeFalsy();
	});
});