ig.module(
	'game.managers.gameManager'
)
.requires(
	'impact.entity'
)
.defines(function () {

    //////////////////////////////////////////////////////////////
    //
    //  게임의 성공, 실패 확인하는 모듈
    //  전역적인 변수 사용을 위한 namespace 제공
    //
    //////////////////////////////////////////////////////////////
    GameManager = ig.Class.extend({
    	
        GAME_TIMER: new ig.Timer(0),

        PAUSE: false,

        
        COIN: 0,
        HEART: 3,
        STAR: 0,
        SCORE: 0,
        JUMP: 0,
        TIME: 0,
        
        //////////////////////////
        
        JUMP : -700,
        WALK_SPEED: 200,
        ACCEL_GROUND: 500,
		ACCEL_AIR: 250,
        
		earthSpeed: { x: -400, y: 0 },
        blockSpeed : { x: -400, y: 0},
		
        LEVEL: null,
        earthCollision: ig.Entity.COLLIDES.FIXED,
        
        levelData: {},
        levelSceneCount : 0,
        itemSpeed : -400,
        springPower: -1000,
        //////////////////////////
        
        
        END: false,

        //SUPER_JUMPY: false,
        gameover : new ig.Image("media/gameover.png"),

        /////////////////////////////////////
        // 레벨링 관련 변수들
        /////////////////////////////////////
        
        
        vanishEarthTime: new ig.Timer(10),
        
        vanishEarthSpeed: 0.005,
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
			ig.music.add( 'media/itemEffect/sound/some.ogg' );
			ig.music.volume = 0.5;
            //UM.timeUp();   // 데이터 리셋
            //UM.clickEvent();
        },
        
        myInit: function(){
        	
        	// check if there is a previous player
        	var prePlayer = ig.game.getEntityByName('player');
        	if( prePlayer != null && prePlayer != undefined) {
        		prePlayer.pos.x = 10;
        		prePlayer.pos.y = 16;
        		TM.player = prePlayer;
        		prePlayer.vel.x = GM.WALK_SPEED;
        	} else {
        		// Spawn Main Player
            	TM.player = ig.game.spawnEntity( EntityPlayer, 10, 16 );
        	}
    	  	
        	// Initialize Game parameters
			this.HEART = 3;
			this.COIN = 0;
			this.STAR = 0;
            this.SCORE = 0;
            this.TIME = 0;
            
            this.PAUSE = false;
            this.END = false;
            
            // Start Musics
			//ig.music.play();
            
			// Background Image need to be change
	        ig.game.spawnEntity(EntityBack,0,0);
			ig.game.sortEntitiesDeferred();
        },
        
        update: function () {
        	if (EM.tail.pos.x < ig.system.realWidth + 20) {
        		this.makeNewScene();
        	}
        },
        
        makeNewScene: function () {
        	if (this.levelData["path"][this.levelSceneCount] == null || this.levelData["path"][this.levelSceneCount] == undefined) return;
        	
        	this.checkGlobalVariables(this.levelData["path"][this.levelSceneCount]);
        	EM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["earth"]);
        	BM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["block"]);
        	IM.fetchAndMakeMonster(this.levelData["path"][this.levelSceneCount]["monster"]);
        	IM.fetchAndMakeItem(this.levelData["path"][this.levelSceneCount]["item"]);
        	this.levelSceneCount++;
        },
        
        checkGlobalVariables: function (data) {
        	if (data["playerSpeed"] != undefined) GM.WALK_SPEED = data["playerSpeed"];
        	if (data["earthSpeed"] != undefined) GM.earthSpeed.x = data["earthSpeed"];
        	if (data["blockSpeed"] != undefined) GM.blockSpeed.x = data["blockSpeed"];
        },
        
        draw: function(){
        	var ctx = ig.system.context;
			if(this.shakeAmlitude){
				ctx.save();
				//ctx.translate(this.shakeAmplitude*(Math.random()-0.5), this.shakeAmplitude*(Math.random()-0.5));
				ctx.translate(1,1);
				this.shakeAmlitude--;
			}
			//this.parent();
		    if(this.shakeAmlitude == 0){
		    	ctx.restore();
		    }
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
    	    ig.finalStats = ig.game.stats;
    	    this.GAME_TIMER = ig.game.levelTimer.delta().toFixed(1);
    		ig.system.setGame(GameOverScreen);
        },
        
        addCoin: function(){
        	this.COIN++;
        },
        
        addHeart: function () {
        	this.HEART++;
        },
        addStar: function () {
        	this.STAR++;
        }
    });
    GameManager.instance = null;
    
    GameManager.LEVEL = {
    		LEVEL01 : "LEVEL01",
    		LEVEL02: "LEVEL02",
    		LEVEL03: "LEVEL03"
    };
});
