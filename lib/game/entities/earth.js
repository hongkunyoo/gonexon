ig.module(
	'game.entities.earth'
)
.requires(
	'impact.entity'
)
.defines(function () {
	
	EntityEarth = ig.Entity.extend({
		
		_init: null,
//        pushed: false,
        maxVel : {x: 10000, y: 10000},
        vel: {x: -200, y: 0},
        friction: {x:0, y:0},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.FIXED,        
        gravityFactor: 0,       
        startVanish: false,
        vanishSpeed: 0.005,

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            GM = new GameManager();
            
            if (this._init != null) this._init();
        },

        update: function () {
        	this.vel.x = GM.earthSpeed.x;
            this.parent();
            
            if (this.startVanish) {
                this.currentAnim.alpha = this.currentAnim.alpha - this.speed;
            }
            
            if (this.currentAnim.alpha < 0) {
            	EM.addEarthAfterTail(this);
            }
            

        },
        
        vanish: function (speed) {
            this.speed = (speed == undefined) ? 0.005 : speed;
            this.startVanish = true;
        },


        check: function (other) {

        },

        collideWith: function (other, axis) {

        }


    });
});
