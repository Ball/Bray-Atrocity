Terrain = function(blocks){
	this.blocks = blocks;
};
Terrain.prototype = {
    render: function(context){
        context.fillStyle = "#cd853f";
        for(var index in this.blocks){
          var block = this.blocks[index];
          context.strokeRect( block.x, block.y, 10, 10);
          context.fillRect( block.x, block.y, 10, 10);
        }
    },
	isColliding : function(point){
    var	block_x = point.x - (point.x % 10);
    var block_y = point.y - (point.y % 10);
		for(var i in this.blocks){
			var block = this.blocks[i];
			if(block_x == block.x && block_y == block.y){
				return true;
			}
		}
		return false;
	}
};
