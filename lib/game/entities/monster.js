ig.module(
	'game.entities.monster'
)
.requires(
	'impact.entity'
)
.defines(function () {

    EntityMonster01 = ig.Entity.extend({
    	 animSheet: new ig.AnimationSheet('media/new/character/monster.png', 62, 95),
        size: {x: 62, y: 95},
        offset: {x: 0, y: 0},
        //bounciness: 5,	
        //flip: false,
        vel: {x: -70, y: 0},
        maxVel: {x: 1000, y: 1000},
		checkAgainst: ig.Entity.TYPE.A,
	    type: ig.Entity.TYPE.B,
	    collides: ig.Entity.COLLIDES.ACTIVE,
	    didDamage: false,
	    killSound : new ig.Sound('media/sound/ogg/Powerup2.ogg'), 

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.06, [0,1,2,3,4,5,6]);
            this.addAnim('die', 1,[7]);
            
            this.currentAnim = this.anims.idle;
        },

        update: function () {
        	this.parent();
        	
        	if (this.pos.x < -1000 || this.pos.y > ig.system.realHeight + 100) {
            	this.kill();
            }
        },
        
        check: function (other) {
            
        	if (other instanceof EntityPlayer) {
        		if (this.didDamage) return;
        		this.didDamage = true;
        		other.vel.x = -500;
        		other.vel.y = -500;
        		other.damage();
        	}
        },
        
        onDestory: function() {
        	this.currentAnim = this.anims.die;
        	this.vel.y = - 400;
        	this.killSound.play();
        	this.collides = ig.Entity.COLLIDES.NEVER;
        	this.type = ig.Entity.TYPE.NONE;
        }
    });
    
    EntityMonster02 = ig.Entity.extend({
   	 animSheet: new ig.AnimationSheet('media/monster.png', 50, 50),
       size: {x: 50, y: 50},
       offset: {x: 0, y: 0},
       bounciness: 5,	
       flip: false,
       vel: {x: -300, y: 0},
       maxVel: {x: 300, y: 150},
       //friction: {x: 0, y: 0},
       checkAgainst: ig.Entity.TYPE.A,
	   type: ig.Entity.TYPE.B,
	   collides: ig.Entity.COLLIDES.ACTIVE,
      

       init: function (x, y, settings) {
           this.parent(x, y, settings);
           this.addAnim('idle', 0.1, [0,1,2,3,4,5,6,7]);
       },

       update: function () {
       	   this.parent();
       	
	       if (this.pos.x < -1000 || this.pos.y > ig.system.realHeight + 100) {
	    	   this.kill();
	       }
       },
       
       check: function (other) {
		   if (other instanceof EntityPlayer) {
			   if (this.didDamage) return;
			   this.didDamage = true;
			   other.vel.x = -500;
			   other.vel.y = -500;
			   other.damage();
		  }
       },
       
       onDestory: function() {
    	   //this.currentAnim = this.anims.die;
    	   //this.collides = ig.Entity.COLLIDES.NEVER;
    	   //this.currentAnim = this.anims.die;
       	   this.collides = ig.Entity.COLLIDES.NEVER;
    	   this.vel.x = 100;
       }
   });
});
