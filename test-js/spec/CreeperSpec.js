describe("Creeper", function(){
        beforeEach(function(){
                this.creep = new Creeper({x:200, y:200});
        });

        it("starts with the location", function(){
                expect(this.creep.location).toEqual({x: 200, y: 200});
        });

        it("starts with the same destination as the location", function(){
                expect(this.creep.location).toEqual(this.creep.destination); 
        })
        
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
                        this.creep.destination = {x: 200, y: 210};
                        this.creep.step();
                        expect(this.creep.location).toEqual(this.creep.destination);
                });
                
                it("ends on the destination when the speed is greater than the distance", function(){
                        this.creep.destination = {x:200, y: 205};
                        this.creep.step();
                        expect(this.creep.location).toEqual(this.creep.destination);
                });
                
                it("ends closer to the destination but not on it when the speed is less than the distance",function(){
                        this.creep.destination = {x:200, y: 215};
                        this.creep.step();
                        expect(this.creep.location).toEqual({x:200, y: 210});
                });

                it("moves in the x direction", function(){
                        this.creep.destination = {x:180, y:200};
                        this.creep.step();
                        expect(this.creep.location).toEqual({x:190, y:200});
                });
        });
});
