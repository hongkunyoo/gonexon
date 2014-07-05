ig.module(
	'game.managers.touchManager'
)
.requires(
	
)
.defines(function () {

   
    TouchManager = ig.Class.extend({

        jumpGage: 0,
   
        flip: 1,
        player: null,

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

            if (ig.input.pressed("jump")) {
				this.player.vel.y = GM.PLAYER_JUMP;   
            }
        }
    });
TouchManager.instance = null;

});
