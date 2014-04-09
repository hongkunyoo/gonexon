ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function () {

    EntityPlayer = ig.Entity.extend({

        size: {x: 20, y: 48},
        offset: {x: 15, y: 0},

        //animSheet: new ig.AnimationSheet('media/monster_sprite.png', 50, 50),
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            
        },

        update: function () {
            

        },
        
        check: function (other) {
            
        },

        draw: function () {
            this.parent();
        }
    });
});
