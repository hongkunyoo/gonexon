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
    	
        COIN: 0,
        HEART: 3,
        STAR: 0,
        SCORE: 0,
        CAN: 5,
        
        JUMP : -700,
        WALK_SPEED: 200,
        ACCEL_GROUND: 500,
		ACCEL_AIR: 250,
        
		springPower: -1000,
		
		earthSpeed: { x: -400, y: 0 },
        blockSpeed : { x: -400, y: 0},
        sinkSpeed: 0.3,
        soarSpeed: 0.3,
        vanishSpeed: 0.01,
        itemSpeed : -400,
        
        earthCollision: ig.Entity.COLLIDES.FIXED,
        
        levelData: {},
        LEVEL: null,
        levelSceneCount : 0,
        
        shakeAmlitude: 0,
        
        bg: "media/sound/ogg/bgm01.ogg",
        //////////////////////////
        

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
    	  	
        	// Level Variables
        	if (this.levelData["COIN"] != undefined) GM.COIN = this.levelData["COIN"];
        	if (this.levelData["HEART"] != undefined) GM.HEART = this.levelData["HEART"];
        	if (this.levelData["STAR"] != undefined) GM.STAR = this.levelData["STAR"];
        	if (this.levelData["SCORE"] != undefined) GM.SCORE = this.levelData["SCORE"];
        	if (this.levelData["bg"] != undefined) GM.bg = this.levelData["bg"];
        	if (this.levelData["CAN"] != undefined) GM.CAN = this.levelData["CAN"];
        	
        	
        	/////////////////////////////////////////
            // Start Musics
        	ig.music.add( GM.bg );
			ig.music.volume = 0.5;
			ig.music.play();
        	/////////////////////////////////////////
        	
        	
        	/////////////////////////////////////////
			// Background Image need to be change
	        ig.game.spawnEntity(EntityBack,0,0);
			ig.game.sortEntitiesDeferred();
			/////////////////////////////////////////
        },
        
        update: function () {
        	if (EM.tail.pos.x < ig.system.realWidth + 20) {
        		this.makeNewScene();
        	}
        },
        
        makeNewScene: function () {
        	console.log('in makeNewScene');
        	if (this.levelData["path"][this.levelSceneCount] == null || this.levelData["path"][this.levelSceneCount] == undefined) return;
        	console.log('after null');
        	this.checkGlobalVariables(this.levelData["path"][this.levelSceneCount]);
        	EM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["earth"]);
        	BM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["block"]);
        	IM.fetchAndMakeMonster(this.levelData["path"][this.levelSceneCount]["monster"]);
        	IM.fetchAndMakeItem(this.levelData["path"][this.levelSceneCount]["item"]);
        	this.levelSceneCount++;
        },
        
        checkGlobalVariables: function (data) {
        	
        	// Player properties
        	if (data["WALK_SPEED"] != undefined) GM.WALK_SPEED = data["WALK_SPEED"];
        	if (data["JUMP"] != undefined) GM.JUMP = data["JUMP"];
        	if (data["ACCEL_GROUND"] != undefined) GM.ACCEL_GROUND = data["ACCEL_GROUND"];
        	if (data["ACCEL_AIR"] != undefined) GM.ACCEL_AIR = data["ACCEL_AIR"];
        	
        	// Spring properties
        	if (data["springPower"] != undefined) GM.springPower = data["springPower"];
        	
        	// Ground properties
        	if (data["earthSpeed"] != undefined) GM.earthSpeed.x = data["earthSpeed"];
        	if (data["blockSpeed"] != undefined) GM.blockSpeed.x = data["blockSpeed"];
        	if (data["sinkSpeed"] != undefined) GM.sinkSpeed = data["sinkSpeed"];
        	if (data["soarSpeed"] != undefined) GM.soarSpeed = data["soarSpeed"];
        	if (data["vanishSpeed"] != undefined) GM.vanishSpeed = data["vanishSpeed"];
        	
        	if (data["itemSpeed"] != undefined) GM.itemSpeed = data["itemSpeed"];
        	
        	// Screen Shaking Amlitude
        	if (data["shakeAmlitude"] != undefined) GM.shakeAmlitude = data["shakeAmlitude"];
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
        },
        addCan : function () {
        	GM.CAN++;
        },
        decreaseCan: function () {
        	GM.CAN--;
        }
    });
    GameManager.instance = null;
    
    GameManager.LEVEL = {
    		LEVEL01 : "LEVEL01",
    		LEVEL02: "LEVEL02",
    		LEVEL03: "LEVEL03"
    };
});
