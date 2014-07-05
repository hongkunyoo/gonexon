ig.module(
	'game.managers.touchManager'
)
.requires(
	
)
.defines(function () {

   
    TouchManager = ig.Class.extend({

        flip: 1,
        player: null,
        dashTimer: new ig.Timer(0.3),
        
        staticInstantiate: function () {
            if (TouchManager.instance == null) {
                return null;
            }
            else {
                return TouchManager.instance;
            }
        },

        init: function () {

            TouchManager.instance = this;

        },
        
        myInit: function () {
        	
        },

        update: function () {

            //if (this.player.vel.y != 0) this.player.vel.x = 42;

            
            
            if (ig.input.pressed("dash")) {
            	if (this.player.stand)
            		this.player.vel.x = GM.ACCEL_GROUND;
            	else
            		this.player.vel.x = GM.ACCEL_AIR;
            	
            	this.dashTimer.reset();
            	this.player.dash = true;
            	this.player.currentAnim = this.player.anims.dash;
            }
            
            if (this.dashTimer.delta() > 0 && this.player.dash) {
            	this.player.dash = false;
            	this.player.currentAnim = this.player.anims.walk;
            	if (this.player.stand) {
            		this.player.vel.x = GM.WALK_SPEED;
            	} else {
            		this.player.vel.x = GM.WALK_SPEED - 150;
            	}
            }
            
            if (ig.input.pressed("jump")) {
            	if (this.player.didJump2) return;
				this.player.vel.y = GM.JUMP;
				this.player.vel.x = GM.WALK_SPEED - 170;
				if (this.player.stand) {
					this.player.currentAnim = this.player.anims.jump;
				} else {
					this.player.currentAnim = this.player.anims.jump2;
					this.player.didJump2 = true;
				}
				this.player.stand = false;
            }
            
        }
    });
TouchManager.instance = null;

});