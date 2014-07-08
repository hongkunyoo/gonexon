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
		rotate : false,
		zIndex: 8,
		sound : new ig.Sound( 'media/sound/ogg/comic011.ogg' ),
	    //gravityFactor:0,
        operated: false,
		
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('run', 0.2, [0,1,2,3,4,5], false);
            
            this.currentAnim = this.anims.idle;
        },


        update: function () {
			this.parent();
			
			if (this.pos.x < -1000 || this.pos.y > ig.system.realHeight + 100) {
            	this.kill();
            }
			
			if (this.rotate) {
				this.currentAnim.angle += 0.5;
			}
        },
        
        collideWith: function(other, axis) {
        	if (other instanceof EntityPlayer) {
        		if (!this.isUpTouch(other)) {
        			this.collides = ig.Entity.COLLIDES.NEVER,
        			this.rotate = true;
        			this.vel.x = 1500;
        			return;
        		}
        		if (this.operated) return;
        		console.log('operate!');
        		this.operated = true;
        		this.currentAnim = this.anims.run;
        		TM.spring();
        		this.sound.play();
        	}
        },
        
        isUpTouch: function (player) {
        	if (player.pos.y + player.size.y <= this.pos.y) return true;
        	return false;
        }
    }); 
});
