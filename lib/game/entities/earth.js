ig.module(
	'game.entities.earth'
)
.requires(
	'impact.entity'
)
.defines(function () {
	
	EntityEarth = ig.Entity.extend({
		
		bounce: false,
		_init: null,
        //pushed: false,
        maxVel : {x: 10000, y: 10000},
        vel: {x: -200, y: 0},
        friction: {x:0, y:0},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.FIXED,        
        gravityFactor: 0,       
//        vanishTimer: new ig.Timer(3),
        startVanish: false,
        vanishSpeed: 0.007,

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
            	EM.returnToPool(this);
            }
            
            if ((this.pos.x < -1000 || this.pos.x > 2000) && (this.bounce == false)){
            	this.bounce = true;
            	GM.COUNT_EARTH++;
            	console.log(this.pos.x,this.pushed, GM.COUNT_EARTH);
            }

        },
        
        vanish: function (speed) {
            this.speed = (speed == undefined) ? 0.007 : speed;
//            this.vanishTimer.reset();
            this.startVanish = true;
        },


        check: function (other) {

        },

        collideWith: function (other, axis) {

        }


    });
});
