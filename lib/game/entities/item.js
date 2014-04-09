ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity'
)
.defines(function () {

    EntityItem = ig.Entity.extend({

        //accel: { x: 0, y: 15 },
        //maxVel : {x: 2000, y: 2000},
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        //pushed: false,

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            
        },

        update: function () {

            this.parent();
           
        },

        check: function (other) {
        	
        },

        collideWith: function (other, axis) {

        }

    });
});
