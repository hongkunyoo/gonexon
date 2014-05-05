ig.module(
	'game.managers.gameManager'
)
.requires(
	'game.levels.basic'
)
.defines(function () {

    //////////////////////////////////////////////////////////////
    //
    //  ������ ����, ���� Ȯ���ϴ� ���
    //  �������� ���� ����� ���� namespace ����
    //
    //////////////////////////////////////////////////////////////
    GameManager = ig.Class.extend({

        // Global Variables
        PLAYER_LIFE: 0,
        COIN: 0,
        HEART: 3,
        SCORE: 0,
        JUMP: 0,
        TIME: 0,
        LEVEL: 1,
        GAME_TIMER: new ig.Timer(0),

        DEBUG_MODE : 1,

        PAUSE: false,

        player: null,
        END: false,

        SUPER_JUMPY: false,
        suerTimer: new ig.Timer(5),
        gameover : new ig.Image("media/gameover.png"),

        /////////////////////////////////////
        // ������ ���� ������
        /////////////////////////////////////

       
        earthSpeed: { x: -200, y: 0 },
        vanishBlockTime: new ig.Timer(20),
        vanishBlockSpeed: 0.007,
        itemSpeed: 0.5,
        shakeAmlitude: 0,

        staticInstantiate: function () {
            if (GameManager.instance == null) {
                return null;
            }
            else {
                return GameManager.instance;
            }
        },

        init: function () {
            GameManager.instance = this;
            //UM.timeUp();   // ������ ����
            //UM.clickEvent();
        },
        
        loadLevel: function(){
                
            ig.game.loadLevel(LevelBasic);  // ���� �ε�

            this.COIN = 0;
            this.HEART = 1;
            this.SCORE = 0;
            this.JUMP = 5;
            this.TIME = 0;
            this.LEVEL = 1;
            this.PAUSE = false;
            this.END = false;

            //UM.startGame(); // ���� ����(�����̾� ����)
            this.setLevel(this.LEVEL);

            //$('#coin .number').html("x " + GM.JUMP);
            //$('#heart .number').html("x " + GM.HEART);

            // initiate stage variables
            TM.player = ig.game.spawnEntity(EntityPlayer, ig.system.realWidth / 2 + 150, 350);
            this.player = TM.player;
            //this.player.makeInvincible();
            BM.generate(BlockManager.TYPE.SIZE_60, ig.system.realWidth/2 + 150, 400);
            //TM.player = ig.game.getEntitiesByType(EntityPlayer)[0];
        },

        update: function () {
        	
        },
        
        draw: function(){
        	var ctx = ig.system.context;
			if(this.shakeAmlitude){
				ctx.save();
				//ctx.translate(this.shakeAmplitude*(Math.random()-0.5), this.shakeAmplitude*(Math.random()-0.5));
				ctx.translate(3,3);
				this.shakeAmlitude--;
			}
			//this.parent();
		    if(this.shakeAmlitude == 0){
		    	ctx.restore();
		    }
        	
        },
        

        _isFinished: function () {
            
        },
        
        shakeScreen: function(){
        	this.shakeAmlitude = 3;
        },
        
        decreaseHeart: function(){
        	if (this.HEART > 1)
        		this.HEART--;
        	else this.GameOver();
        },
        
        GameOver: function(){
        	console.log("Game Over!");
    	    ig.finalStats = ig.game.stats;
    		ig.system.setGame(GameOverScreen);
        		  	    
        	// player & background Pause
        	// UI gameover script print
        	// Menu Restart, Done
        },

        superZumpy: function () {
//            this.player.currentAnim.alpha = 0.85;
//            this.suerTimer.reset();
//            this.SUPER_JUMPY = true;
        },

        setLevel: function (level) {
//            this.blockSpeed = { vel: { x: -160 - level * 40, y: 0 }};
//            this.floorSpeed = { vel: { x: -160 - level * 40, y: 0 } };
//            this.vanishBlockTime.set(30);
//            this.vanishBlockSpeed = 0.005 + 0.002 * level;
//            this.itemSpeed = 0.4;

        }
    });
    GameManager.instance = null;
});
