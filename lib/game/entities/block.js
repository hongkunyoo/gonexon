ig.module(
   'game.entities.block'
)
.requires(
   'impact.entity'
)
.defines(function () {

    EntityBlock = ig.Entity.extend({

    	_init: null,
        maxVel : {x: 10000, y: 10000},
        vel: {x: -200, y: 0},
        friction: {x:0, y:0},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.FIXED,        
        gravityFactor: 0,  
       

        init: function (x, y, settings) {
            this.parent(x, y, settings);

            if (this._init != null) this._init();
        },

        update: function () {

            this.parent();
           this.vel.x = GM.earthSpeed.x;

            if (this._update != null) this._update();


        },


        check: function (other) {

        },

        collideWith: function (other, axis) {

        }

    });
});
