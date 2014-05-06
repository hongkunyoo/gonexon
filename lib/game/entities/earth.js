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
        //speed: 0.007,
        //vanishTimer: new ig.Timer(3),
        //startVanish: false,
        
        
        

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            
            console.log('init!@_@');
            if (this._init != null) this._init();
        },

        update: function () {

            this.parent();

            //if (this._update != null) this._update();

            /*if (this.pos.y < 0)   <- 왜 이렇게 썼지????
                this.kill();  

            if (this.startVanish) {
                this.currentAnim.alpha = this.currentAnim.alpha - this.speed;
            }
            if (this.currentAnim.alpha < 0) this.kill(); */
        },

        /*vanish: function (speed) {
            this.speed = speed == undefined ? 0.007 : speed;
            this.vanishTimer.reset();
            this.startVanish = true;
        }, */

        check: function (other) {

        },

        collideWith: function (other, axis) {

        }


    });
});
