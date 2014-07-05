ig.module(
	'game.entities.spring'
)
.requires(
	'impact.entity'
)
.defines(function () {
	
    EntitySpring = ig.Entity.extend({
    	animSheet: new ig.AnimationSheet('media/new/item/spring.png', 85, 86),
        size: {x: 85, y: 86},
        offset: {x: 0, y: 0},
        type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		 collides: ig.Entity.COLLIDES.ACTIVE,
	    //gravityFactor:0,
       
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('run', 0.2, [0,1,2,3,4,5]);
            
            this.currentAnim = this.anims.idle;
        },


        update: function () {
			this.parent();
//			if(this.sp==1){
//				this.currentAnim = this.anims.run;
//			}else{
//				this.currentAnim = this.anims.idle;
//			}
//			this.sp=0;
			
			if (this.pos.x < -1000 || this.pos.y > ig.system.realHeight + 100) {
            	this.kill();
            }
        },
        
        check: function (other) {
        	
        	if (other instanceof EntityPlayer) {
        		this.currentAnim = this.anims.run;
        		other.vel.y = -500;
        		console.log('spring operating!');
        	}
        }
        
        
    }); 
});
