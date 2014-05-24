ig.module(
	'game.entities.block'
)
.requires(
	'impact.entity'
)
.defines(function () {

    EntityBlock = ig.Entity.extend({

//        pushed: false,
//        flip: 1,
//        gravityFactor: 0,
//        vel: {x: -200, y: 0},
//        maxVel: {x: 2000, y: 2000},
//        type: ig.Entity.TYPE.B,
//        checkAgainst: ig.Entity.TYPE.A,
//        collides: ig.Entity.COLLIDES.FIXED,
//        vanishTimer: new ig.Timer(3),
//        startVanish: false,
//        speed: 0.007,
    	
    	_init: null,
		//_update: null,
        maxVel : {x: 10000, y: 10000},
        vel: {x: -150, y: 0},
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

            if (this._update != null) this._update();

//            if (this.pos.y < 0)
//                this.kill();

//            if (this.startVanish) {
//                this.currentAnim.alpha = this.currentAnim.alpha - this.speed;
//            }
//            if (this.currentAnim.alpha < 0) this.kill();
        },

//        vanish: function (speed) {
//            this.speed = speed == undefined ? 0.007 : speed;
//            this.vanishTimer.reset();
//            this.startVanish = true;
//        },

        check: function (other) {

        },

        collideWith: function (other, axis) {

        }

    });
});
