describe("Creeper", function(){
  beforeEach(function(){
    this.creep = new Creeper({x:200, y:200});
  });
  
  it("starts with the location", function(){
    expect(this.creep.location).toEqual({x: 200, y: 200});
  });
  
  it("starts with the same destination as the location", function(){
    expect(this.creep.location).toEqual(this.creep.destination); 
  });
  
  describe("Moving a creeper", function(){
    it("defaults the speed to 10", function(){
      expect(this.creep.speed).toEqual(10);
    });
    
    it("doesn't move when the location and destination are the same", function(){
      var originalLocation = this.creep.location;
      this.creep.step();
      expect(this.creep.location).toEqual(originalLocation);
    });
    
    it("ends on the destination when the speed is equal to the distance",function(){
      this.creep.moveTo( {x: 200, y: 210} );
      this.creep.step();
      expect(this.creep.location).toEqual(this.creep.destination);
    });
    
    it("ends on the destination when the speed is greater than the distance", function(){
      this.creep.moveTo( {x:200, y: 205} );
      this.creep.step();
      expect(this.creep.location).toEqual(this.creep.destination);
    });
    
    it("ends closer to the destination but not on it when the speed is less than the distance",function(){
      this.creep.moveTo( {x:200, y: 215});
      this.creep.step();
      expect(this.creep.location).toEqual({x:200, y: 210});
    });
    
    it("moves in the x direction", function(){
      this.creep.moveTo( {x:180, y:200});
      this.creep.step();
      expect(this.creep.location).toEqual({x:190, y:200});
    });
  });

	describe("Moving a creeper around terrain", function(){
		beforeEach(function(){
			this.creep.terrain = new Terrain( [{x:200, y:210}] );
			this.creep.moveTo( {x:200, y:250} );
		});
	  it("Steps when terrain is far off", function(){
		  this.creep.terrain = new Terrain( [{x:200, y:230}] );
		  this.creep.step();
	    expect(this.creep.location).toEqual({x:200, y:210});		
	  });
	  it("Stands when destination is on adjacent terrain", function(){
		  var originalLocation = this.creep.location;
		  this.creep.moveTo( {x:200, y:210});
		  this.creep.step();
		  expect(this.creep.location).toEqual(originalLocation);
	  });
	  it("Steps to the right when the terrain is adjacent", function(){
		  this.creep.step();
		  expect(this.creep.location).toEqual({x:210, y:200});
	  });
	  it("steps to the right on an angle",function(){
		  this.creep.terrain = new Terrain([{x:210, y:210}]);
		  this.creep.location = {x: 205, y:205};
		  this.creep.moveTo( {x: 250, y: 250} );
		  this.creep.step();
 		  expect(this.creep.location).toEqual({x:212.07, y:197.93});
	  });
	  it("steps to the right when adjacent left-right", function(){
		  this.creep.terrain = new Terrain([{x:210,y:200}]);
		  this.creep.moveTo( {x:250, y:200} );
		  this.creep.step();
		  expect(this.creep.location).toEqual({x:200,y:190});
	  });
	  it("bug - doesn't step around a long wall at a steep angle", function(){
		  this.creep.terrain = new Terrain([{x:300, y:210},
	                   {x:300, y:220},
	                   {x:300, y:230},
	                   {x:300, y:240},
	                   {x:300, y:250},
	                   {x:300, y:260},
	                   {x:300, y:270}]);
	    this.creep.location = {x: 297.54, y: 226.91};
	    this.creep.moveTo( {x: 320, y: 271} );
	    this.creep.step();
	    expect(this.creep.terrain.isColliding(this.creep.location)).toBeFalsy();
	    expect(this.creep.destination).toEqual({x:320, y:271});
	  });
    it("should not move when stepping on a monster", function(){
      this.creep.monsters = [new Sprite({x: 100, y: 100})];
      this.creep.location = {x:200, y:200};
      this.creep.moveTo({x:100, y:100});
      this.creep.step();
      expect(this.creep.monsters[0].isColliding({x:100, y:100})).toBeTruthy();
      expect(this.creep.destination).toEqual({x:200, y:200});
      expect(this.creep.location).toEqual({x:200, y:200});
    });
	});
});
