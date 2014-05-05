  ig.module(
	'game.entities.block'
)
.requires(
	'impact.entity'
)
.defines(function () {
    EntityBlock = ig.Entity.extend({
    	animSheet: new ig.AnimationSheet( 'media/block.png', 52, 15 ),
        size: {x: 52, y:15},
        offset: {x: 0, y: 0},
        gravityFactor: 0,
        vel: {x: -13, y: 0},
        maxVel: {x: 20, y: 20},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.FIXED,
        name : 'block',
   
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle;
        },

        update: function () {
            this.parent();

        }


    });
    });