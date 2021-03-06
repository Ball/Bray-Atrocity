Creeper = function(location){
  this.history = [];
  this.location = location;
  this.destination = location;
  this.speed = 10;
  this.terrain = new Terrain([]);
  this.monsters = [];
};

Creeper.prototype =
(function(){
  return {
    __proto__: Sprite.prototype,
    setFillStyle: function(context){
      context.fillStyle = "#eee";
    },
    drawOnScreen: function(context){
       context.strokeRect(this.location.x-5, this.location.y-5, 10, 10);
       context.fillRect(this.location.x-5, this.location.y-5, 10, 10);
       if(this.target != undefined){
         context.beginPath();
         context.moveTo(this.location.x, this.location.y);
         context.lineTo(this.target.x, this.target.y);
         context.closePath();
         context.stroke();
         this.target = undefined;
       }
    },
    shootAt: function(location){
      this.target = location;
    },
    moveTo: function(location){
      for(var i in this.monsters){
        if(this.monsters[i].isColliding(location)){
          this.destination = this.location;
          this.shootAt(location);
          return;
        }
      }
      this.destination = location;
    },
    stepSide: function(theta,isPlus){
      if(isPlus){
        theta += 3.14159 / 2.0;
      }
      else{
        theta -= 3.14159 / 2.0;
      }
      var newX = this.round(this.location.x + this.speed * Math.cos(theta));
      var newY = this.round(this.location.y + this.speed * Math.sin(theta));
      return {x: newX, y: newY, theta: theta };
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
      
      var theta = Math.atan2(opposite, adjacent);    
  
      var moveOpposite = this.speed * Math.sin(theta);
      var moveAdjacent = this.speed * Math.cos(theta);
      var newX = location.x + moveAdjacent;
      var newY = location.y + moveOpposite;
      
      
      return this.firstStepNotColliding(newX, newY, theta);
    },
    firstStepNotColliding: function(x,y,theta){
      if(!this.terrain.isColliding({x:x,y:y}))
      {
        return {x:x, y:y};
      }
      var newStep = this.stepSide(theta, false);
      if(!this.terrain.isColliding({x:newStep.x, y: newStep.y})){
        return newStep;
      }
      else{
        return this.stepSide(theta, true);
      }
    },
    step: function(){
      var temp = this.guessStep(this.location, this.destination);
      while(this.terrain.isColliding(temp)){
        temp = this.guessStep(this.location, {x: temp.nextX, y: temp.nextY});
      }
      this.history.push(this.location);
      this.location = {x: temp.x, y: temp.y};
    }
  };
})();
