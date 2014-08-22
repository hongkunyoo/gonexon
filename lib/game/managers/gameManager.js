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
        
        currentEarth : {
			pos : {x: 0, y: 380},
			size : {x: 0, y: 0}
		},
		
		currentBlock : null,
		currentMonster: null,
		currentItem : {
			pos : {x: 0, y: 380},
			size : {x: 0, y: 0}
		},
        
        bg: "media/bgm.ogg",
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
        		prePlayer.pos.x = 80;
        		prePlayer.pos.y = 30;
        		TM.player = prePlayer;
        		TM.player.canEnable = false;
        		prePlayer.vel.x = GM.WALK_SPEED;
        	} else {
        		// Spawn Main Player
            	TM.player = ig.game.spawnEntity( EntityPlayer, 80, 30 );
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
			
			this.checkGlobalVariables(this.levelData);
			
			this.currentBlock = this.currentEarth;
			this.currentMonster = this.currentEarth;
			this.currentItem = this.currentEarth;
        },
        
        update: function () {
        	if (this.currentEarth.pos.x < ig.system.realWidth + 20) {
        		this.makeNewScene();
        	}
        },
        
        makeNewScene: function () {
        	
        	if (this.levelData["path"][this.levelSceneCount] == null || this.levelData["path"][this.levelSceneCount] == undefined) return;
        	
        	
//        	EM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["earth"]);
//        	BM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["block"]);
//        	IM.fetchAndMakeMonster(this.levelData["path"][this.levelSceneCount]["monster"]);
//        	IM.fetchAndMakeItem(this.levelData["path"][this.levelSceneCount]["item"]);
        	
    		
        	
    		var blockData = this.levelData["path"][this.levelSceneCount]["block"];
    		if (blockData != undefined) {
    			for (var i = 0 ; i < blockData.length ; i++) {
    				this.currentBlock = BM.getFromPool(BlockManager.TYPE[blockData[i].type], 
            				this.currentBlock.pos.x + blockData[i].x ,
            				this.currentBlock.pos.y - blockData[i].y);
    				this.currentBlock.feature(blockData[i].feature);
    			}
    		}
    		
    		var earthData = this.levelData["path"][this.levelSceneCount]["earth"];
        	if (earthData != undefined) {
        		this.currentEarth = EM.getFromPool(EarthManager.TYPE[earthData.type], this.currentEarth.pos.x + this.currentEarth.size.x + earthData.x + 0.05, this.currentEarth.pos.y + earthData.y);
        		this.currentEarth.feature(earthData.feature);
        	} else {
        		this.currentEarth = this.currentBlock;
        	}
    		
    		
    		var monsterData = this.levelData["path"][this.levelSceneCount]["monster"];
    		if (monsterData != undefined) {
    			
    			for (var i = 0 ; i < monsterData.length ; i++) {
    				this.currentMonster = IM.generate(ItemManager.TYPE[monsterData[i].type], 
            				this.currentMonster.pos.x + monsterData[i].x ,
            				this.currentMonster.pos.y - monsterData[i].y);
    			}
    		}
    		
    		
    		var itemData = this.levelData["path"][this.levelSceneCount]["item"];
    		if (itemData != undefined) {
    			for (var i = 0 ; i < itemData.length ; i++) {
    				if (ItemManager.ARRANGE_TYPE[itemData[i].type] != undefined) {
    					IM.itemArrange(ItemManager.ARRANGE_TYPE[itemData[i].type], this.currentItem.pos.x + itemData[i].x, 
        						this.currentItem.pos.y - (itemData[i].y+ 20));
            		} else {
            			this.currentItem = IM.generate(ItemManager.TYPE[itemData[i].type], itemData[i].x + this.currentItem.pos.x, 
            					this.currentItem.pos.y - (itemData[i].y));
            		}
    			}
    			
    		}
    		
    		this.currentBlock = this.currentEarth;
    		this.currentMonster = this.currentEarth;
    		this.currentItem = this.currentEarth;
			       	
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
        	//this.STAR++;
        	this.COIN++;
        },
        addCan : function () {
        	GM.CAN++;
        },
        decreaseCan: function () {
        	GM.CAN--;
        },
        doGameOver: function () {
        	setTimeout(function() {GM.GameOver(); }, 900);
        }
    });
    GameManager.instance = null;
    
    GameManager.LEVEL = {
    		LEVEL01 : "LEVEL01",
    		LEVEL02: "LEVEL02",
    		LEVEL03: "LEVEL03"
    };
});
