Creeper = function(location){
	this.location = location;
	this.destination = location;
	this.speed = 10;
	this.terrain = new Terrain([]);
};
Creeper.prototype = {
	stepRight: function(opposite, adjacent){
		var newX = 0;
		var newY = 0;
		if(opposite*opposite > adjacent*adjacent){
			if(opposite > 0){
				newX = this.location.x + this.speed;
				newY = this.location.y;
			}
			else{
				newX = this.location.x - this.speed;
				newY = this.location.y;
			}
		}
		else{
			if(adjacent > 0){
				newY = this.location.y - this.speed; 
				newX = this.location.x;
			}
			else{
				newY = this.location.y + this.speed;
				newX = this.location.x;
			}
		}
		return {x: newX, y: newY};
	},
	guessStep: function(location, destination){
		// Opposite and Adjacent are in relation to the
		// theta of the creeps polar coordinates.
		// sin theta = opposite / hypotenuse
		// cos theta = adjacent / hypotenuse
		// tan theta = opposite / adjacent
    var opposite = (destination.y - location.y);
    var adjacent = (destination.x - location.x);
		
		var h1 = Math.sqrt(opposite*opposite + adjacent*adjacent);
		
		if(h1 <= this.speed){
			if(!this.terrain.isColliding(destination)){
			  return destination;
		  }
			return location;
		}
    
    var theta = Math.atan2(opposite / adjacent);    

		var moveOpposite = opposite * (this.speed / h1);
		var moveAdjacent = adjacent * (this.speed / h1);
		var newX = location.x + moveAdjacent;
		var newY = location.y + moveOpposite;
		
		if(! this.terrain.isColliding({x:newX, y:newY})){
			return {x: newX, y: newY};
		}	
		else{
			return this.stepRight(opposite,adjacent);
		}
	},
	step: function(){
		var temp = this.guessStep(this.location, this.destination);
		while(this.terrain.isColliding(temp)){
			temp = this.guessStep(this.location, {x: temp.nextX, y: temp.nextY});
		}
		this.location = {x: temp.x, y: temp.y};
	}
}
