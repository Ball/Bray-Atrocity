Creeper = function(location){
	this.location = location;
	this.destination = location;
	this.speed = 10;
};
Creeper.prototype = {
	step : function(){
		var opposite = (this.destination.y - this.location.y);
		var adjacent = (this.destination.x - this.location.x);
		var h1 = Math.sqrt(opposite*opposite + adjacent*adjacent);
		alert("adjacent:" + adjacent + " opposite:"+opposite+" h1:"+h1)
		if(h1 <= this.speed){
			this.location = this.destination;
			return;
		}
		var moveOpposite = opposite * (h1 / this.speed);
		var moveAdjacent = adjacent * (h1 / this.speed);
		this.location = {x: this.location.x + moveAdjacent, y: this.location.y + moveOpposite};
	}
}