ig.module(
	'game.entities.earth'
)
.requires(
	'impact.entity'
)
.defines(function () {
	
	EntityEarth = ig.Entity.extend({
		
//      pushed: false,
		_init: null,
        //maxVel : {x: 10000, y: 10000},
        //vel: {x: -200, y: 0},
        //friction: {x:0, y:0},
        //type: ig.Entity.TYPE.A,
        //checkAgainst: ig.Entity.TYPE.B,
        //collides: ig.Entity.COLLIDES.FIXED,        
        gravityFactor: 1,       
        //startVanish: false,
        //vanishSpeed: 0.005,

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            //this.vel.y = -100;
            
            if (this._init != null) this._init();
        },

        update: function () {
        	//this.vel.x = GM.earthSpeed.x;
        	
        	this.vel.y = - 7;
        	
            this.parent();
            /*
            if (this.startVanish) {
                this.currentAnim.alpha = this.currentAnim.alpha - this.speed;
            }
            
            if (this.currentAnim != null && this.currentAnim.alpha < 0) {
            	EM._addEarthAfterTail(this);
            }
            */
        }
        /*,
        
        vanish: function (speed) {
            this.speed = (speed == undefined) ? 0.005 : speed;
            this.startVanish = true;
        }
		*/
    });
});
