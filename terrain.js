Terrain = function(blocks){
	this.blocks = blocks;
};
Terrain.prototype = {
	isColiding : function(point){
    var	block_x = point.x - (point.x % 10);
    var block_y = point.y - (point.y % 10);
		for(var i in blocks){
			var block = blocks[i];
			if(block_x == block.x && block_y == block.y){
				return true;
			}
		}
		return false;
	}
};
