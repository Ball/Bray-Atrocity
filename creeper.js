Creeper = function(location){
	this.location = location;
	this.destination = location;
	this.speed = 10;
	this.terrain = [];
};
Creeper.prototype = {
	step : function(){
		var opposite = (this.destination.y - this.location.y);
		var adjacent = (this.destination.x - this.location.x);
		var h1 = Math.sqrt(opposite*opposite + adjacent*adjacent);
		if(h1 <= this.speed){
			this.location = this.destination;
			return;
		}
		var moveOpposite = opposite * (this.speed / h1);
		var moveAdjacent = adjacent * (this.speed / h1);
		this.location = {x: this.location.x + moveAdjacent, y: this.location.y + moveOpposite};
	}
}
