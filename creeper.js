Creeper = function(location){
	this.location = location;
	this.destination = location;
	this.speed = 10;
	this.terrain = new Terrain([]);
};
Creeper.prototype = {
	stepRight: function(opposite, adjacent){
		if(opposite*opposite > adjacent*adjacent){
			if(opposite > 0){
				this.location.x += this.speed;
			}
			else{
				this.location.x -= this.speed;
			}
		}
		else{
			if(adjacent > 0){
				this.location.y -= this.speed; 
			}
			else{
				this.location.y += this.speed;
			}
		}
	},
	step: function(){
		// Opposite and Adjacent are in relation to the
		// theta of the creeps polar coordinates.
		// sin theta = opposite / hypotenuse
		// cos theta = adjacent / hypotenuse
		var opposite = (this.destination.y - this.location.y);
		var adjacent = (this.destination.x - this.location.x);
		var h1 = Math.sqrt(opposite*opposite + adjacent*adjacent);
		if(h1 <= this.speed){
			if(!this.terrain.isColliding(this.destination)){
			  this.location = this.destination;
		  }
			return;
		}

		var moveOpposite = opposite * (this.speed / h1);
		var moveAdjacent = adjacent * (this.speed / h1);
		var newX = this.location.x + moveAdjacent;
		var newY = this.location.y + moveOpposite;
		if(this.terrain.isColliding({x:newX, y:newY})){
		  this.stepRight(opposite, adjacent);
		}
		else{
			this.location = {x: newX, y: newY};
		}
	}
}
