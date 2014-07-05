ig.module(
	'game.managers.gameManager'
)
.requires(
	'game.levels.level01',
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
    	
        // Global Variables
        PLAYER_LIFE: 0,
        COIN: 0,
        HEART: 3,
        SCORE: 0,
        JUMP: 0,
        TIME: 0,
        
        GAME_TIMER: new ig.Timer(0),

        DEBUG_MODE : 1,

        PAUSE: false,

        player: null,
        
        //////////////////////////
        
        JUMP : -700,
        WALK_SPEED: 200,
        ACCEL_GROUND: 600,
		ACCEL_AIR: 250,
        
        
        LEVEL: null,
        earthCollision: ig.Entity.COLLIDES.FIXED,
        earthSpeed: { x: -400, y: 0 },
        blockSpeed : { x: -400, y: 0},
        levelData: null,
        levelSceneCount : 0,
        
        //////////////////////////
        
        
        END: false,

        //SUPER_JUMPY: false,
        gameover : new ig.Image("media/gameover.png"),

        /////////////////////////////////////
        // 레벨링 관련 변수들
        /////////////////////////////////////

        
        
        vanishEarthTime: new ig.Timer(10),
        
        vanishEarthSpeed: 0.005,
        itemSpeed: -200,
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
			//ig.music.play();
            //UM.timeUp();   // 데이터 리셋
            //UM.clickEvent();
        },
        
        myInit: function(){
			GM.HEART = 3;
			GM.LEVEL = GameManager.LEVEL.LEVEL01;
			
			this.levelData = LEVEL01;
        },
        
        loadLevel: function(){
                
            ig.game.loadLevel(LevelBasic);  // 레벨 로딩

            this.COIN = 0;
            this.HEART = 1;
            this.SCORE = 0;
            this.JUMP = 5;
            this.TIME = 0;
            this.LEVEL = 1;
            this.PAUSE = false;
            this.END = false;

            this.setLevel(this.LEVEL);

            //BM.generate(BlockManager.TYPE.SIZE_60, ig.system.realWidth/2 + 150, 400);
        },
        flag : true,
        update: function () {
        	
        	if (EM.tail.pos.x < ig.system.realWidth + 20) {
        		this.makeNewScene();
        	}
        },
        
        makeNewScene: function () {
        	if (this.levelData["path"][this.levelSceneCount] == null || this.levelData["path"][this.levelSceneCount] == undefined) return;
        	EM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["earth"]);
        	BM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["block"]);
//        	EM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["monster"]);
//        	EM.fetchAndMake(this.levelData["path"][this.levelSceneCount]["item"]);
        	this.levelSceneCount++;
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
    	    this.GAME_TIMER = ig.game.levelTimer.delta().toFixed(1);
    		ig.system.setGame(GameOverScreen);
        		  	    
        	// player & background Pause
        	// UI gameover script print
        	// Menu Restart, Done
        },
        
        addCoin: function(){
        	this.COIN++;
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
    
    GameManager.LEVEL = {
    		LEVEL01 : "LEVEL01",
    		LEVEL02: "LEVEL02",
    		LEVEL03: "LEVEL03"
    };
});
