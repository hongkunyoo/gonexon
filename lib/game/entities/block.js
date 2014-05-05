  ig.module(
	'game.entities.block'
)
.requires(
	'impact.entity'
)
.defines(function () {
    EntityBlock = ig.Entity.extend({
    	animSheet: new ig.AnimationSheet( 'media/kk.png', 120, 20 ),
        size: {x: 120, y:20},
        offset: {x: 0, y: 0},
        
        //vel: {},,
        //accel: { x: 0, y: -1000 },
        gravityFactor: 0,
        //accel: { x: -1000, y: 0 },
        vel: {x: -20, y: 0},
        maxVel: {x: 20, y: 20},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.FIXED,
        name : 'block',
   
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },

        update: function () {
            this.parent();
            this.currentAnim = this.anims.idle;

        }


    });
    });