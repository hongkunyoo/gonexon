ig.module(
	'game.entities.earth'
)
.requires(
	'impact.entity'
)
.defines(function () {
	
	EntityEarth = ig.Entity.extend({
		
		
        //flip: 1,
        //accel: { x: -1000, y: 0 },
		_init: null,
		//_update: null,
        pushed: false,
        maxVel : {x: 10000, y: 10000},
        vel: {x: -200, y: 0},
        friction: {x:0, y:0},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.FIXED,        
        gravityFactor: 0,       
        

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            GM = new GameManager();
            
            if (this._init != null) this._init();
        },

        update: function () {
        	this.vel.x = GM.earthSpeed.x;
            this.parent();

            //if (this._update != null) this._update();


        },


        check: function (other) {

        },

        collideWith: function (other, axis) {

        }


    });
});
