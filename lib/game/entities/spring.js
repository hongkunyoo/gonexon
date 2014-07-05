ig.module(
	'game.entities.spring'
)
.requires(
	'impact.entity'
)
.defines(function () {
	
    EntitySpring = ig.Entity.extend({
    	animSheet: new ig.AnimationSheet('media/spring.png', 80, 102),
        size: {x: 80, y: 102},
        offset: {x: 0, y: 0},
        flip: false,
        vel: {x: 0, y: 0},
        maxVel: {x: 300, y: 150},
        friction: {x: 0, y: 0},
        type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		 collides: ig.Entity.COLLIDES.FIXED,
	    //gravityFactor:0,
	    sp:0,
       
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('run', 0.2, [1,2,3,4]);
            
        },


        update: function () {
			this.parent();
			if(this.sp==1){
				this.currentAnim = this.anims.run;
			}else{
				this.currentAnim = this.anims.idle;
			}
			this.sp=0;

        },
        
        check: function (other) {

        }


        
    }); 
});
