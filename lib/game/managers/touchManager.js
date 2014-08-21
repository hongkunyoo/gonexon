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

//            if (ig.input.pressed("dash")) {
//            	if (this.player.stand)
//            		this.player.vel.x = GM.ACCEL_GROUND;
//            	else
//            		this.player.vel.x = GM.ACCEL_AIR;
//            	
//            	this.dashTimer.reset();
//            	this.player.dash = true;
//            	this.player.currentAnim = this.player.anims.dash;
//            }
//            
//            if (this.dashTimer.delta() > 0 && this.player.dash) {
//            	this.player.dash = false;
//            	this.player.currentAnim = this.player.anims.walk;
//            	if (this.player.stand) {
//            		//this.player.vel.x = GM.WALK_SPEED;
//            	} else {
////            		this.player.vel.x = GM.WALK_SPEED - 150;
//            	}
//            }
        	
    		if (ig.input.state('right')) {
    			
    			// on Ground
    			if (this.player.stand) {
    				TM.player.vel.x = GM.WALK_SPEED;
    				GM.earthSpeed.x = - this.player.vel.x;
    				TM.player.anims.walk.flip.x = false;
    			}
    			// on Air
    			else {
    				this.player.vel.x = 0;
    				GM.earthSpeed.x = -400;
    				TM.player.anims.jump.flip.x = false;
    			}
    			
    			
    		}
    		if (ig.input.released('right')) {
    			GM.earthSpeed.x = 0;
    			TM.player.vel.x = 0;
    		}
    		
    		if (ig.input.state('left')) {
    			if (this.player.stand) {
    				TM.player.vel.x = -GM.WALK_SPEED;
    				GM.earthSpeed.x = - this.player.vel.x;
    				TM.player.anims.walk.flip.x = true;
    			}
    			else {
    				this.player.vel.x = 0;
    				GM.earthSpeed.x = 400;
    				TM.player.anims.jump.flip.x = true;
    			}
    				
    			
    		}
    		if (ig.input.released('left')) {
    			GM.earthSpeed.x = 0;
    			TM.player.vel.x = 0;
    		}
            
    		
            if (ig.input.pressed("jump")) {
            	if (this.player.didJump2) return;
				this.player.vel.y = GM.JUMP;
				//this.player.vel.x = GM.WALK_SPEED - 170;
				//GM.earthSpeed.x = - this.player.vel.x;
				this.player.vel.x = 0;
				//GM.earthSpeed.x = -300;
				if (this.player.stand) {
					this.player.currentAnim = this.player.anims.jump;
					this.player.jumpSound.play();
				} else {
					this.player.currentAnim = this.player.anims.jump2;
					this.player.jumpSound.play();
					this.player.didJump2 = true;
				}
				this.player.stand = false;
            }
            
            if (ig.input.pressed('shoot')) {
            	if (GM.CAN > 0) {
            		GM.decreaseCan();
            		var can = IM.generate(ItemManager.TYPE.CAN, this.player.pos.x,
                			this.player.pos.y);
                	
                	can.vel.x = this.player.vel.x/2 + 300;
            	}
            }
            
        },
        
        spring: function () {
        	this.player.vel.y = GM.springPower;
        }
    });
    TouchManager.instance = null;
});
