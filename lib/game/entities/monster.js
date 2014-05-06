ig.module(
	'game.entities.monster'
)
.requires(
	'impact.entity'
)
.defines(function () {

    EntityMonster = ig.Entity.extend({
    	 animSheet: new ig.AnimationSheet('media/monster.png', 50, 50),
        size: {x: 50, y: 50},
        offset: {x: 0, y: 0},
        bounciness: 5,	
        flip: false,
        vel: {x: -300, y: 0},
        maxVel: {x: 300, y: 150},
        friction: {x: 0, y: 0},
		checkAgainst: ig.Entity.TYPE.B,
	    type: ig.Entity.TYPE.A,
	    collides: ig.Entity.COLLIDES.ACTIVE,
       


        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0,1,2,3,4,5,6,7]);
        },

        update: function () {
        	   this.parent();
        	this.currentAnim = this.anims.idle;
        },
        
        check: function (other) {
            
        }


        
    });
});
