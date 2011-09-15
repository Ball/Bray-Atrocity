Sprite = function(location){
  this.location = location;
  this.destination = location;
};
Sprite.prototype =
(function(){
  return {
    setFillStyle: function(context){
      context.fillStyle = "#000";
    },
    drawOnScreen: function(context){
      context.strokeRect(this.location.x-5, this.location.y-5, 10, 10);
      context.fillRect(this.location.x-5, this.location.y-5, 10, 10);
    },
    render: function(context){
      this.setFillStyle(context);
      this.drawOnScreen(context);
    },
    round: function(number){
      return Math.round(100.0*number)/100.0;
    },
    step: function(){
      this.location = this.destination;
    },
    moveTo: function(point){
      this.destination = point;
    },
  };
})();
