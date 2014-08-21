ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.timer',
	
	'game.entities.player',
    'game.managers.gameManager',
    'game.managers.itemManager',
    'game.managers.touchManager',
    'game.entities.monster',
    'game.managers.earthManager',
    'game.managers.blockManager',
	'game.managers.eventManager',
    'game.ui.uiMessage',
	'game.entities.back',
	
	'game.levels.level00',
	'game.levels.level01',
//	'impact.debug.debug'
	
	'game.entities.can'
	

)

.defines(function(){
MyGame = ig.Game.extend({

	levelTimer: new ig.Timer(),
	levelExit: null,
	stats: { time: 0 },
	gravity: 2000,
	
	lifeSprite : new ig.Image("media/heart_small.png"),
	//lifeSprite : new ig.Image("media/heart_small.png"),
	canSprite : new ig.Image("media/new_img/drink-01.png"),

	coinSprite : new ig.Image("media/new/item/coin_piece.png"),
	
	gameoverSprite : new ig.Image("media/gameover.png"),
	font: new ig.Font("media/04b03.font.png"),
	tiles: new ig.Image( 'media/tiles.png' ),

	timer: new ig.Timer(1.2),

	img : new ig.Image( 'media/background.png' ),
	
	init: function() {
		
		// Create each Manager instances
		GM = new GameManager();
		TM = new TouchManager();
		EM = new EarthManager();
		BM = new BlockManager();
		IM = new ItemManager();
		//EV = new EventManager();
		
        // Bind keys
//        ig.input.bind( ig.KEY.RIGHT_ARROW, 'dash' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.Z,'shoot');
        ig.input.bind( ig.KEY.A, 'test');
        ig.input.bind( ig.KEY.SPACE, 'continue' );
        
        // Start the given level
        this.myLoadLevel(LEVEL01);

		//var coin = IM.generate(ItemManager.TYPE.COIN, 200, 15);
		//coin.type = ig.Entity.TYPE.NONE;
	},
	
	myLoadLevel: function( level ) {
		GM.levelData = level;
		GM.LEVEL = GM.levelData.level;
		
		GM.myInit();
		TM.myInit();
		EM.myInit();
		BM.myInit();
		IM.myInit();
	},
		
	update: function () {
	   	
		GM.update();
		EM.update();
		BM.update();
		TM.update();
		IM.update();
		
		this.parent();
		
		if (ig.input.pressed('test')) {
			GM.WALK_SPEED = 300;
		}
	},

	draw: function() {
			
	    this.parent();
		
		// Draw Game Level Effects
	    GM.draw();

	    //this.font.draw("Lives",5,5);
	    for(var i=0; i < GM.HEART; i++)
	    	this.lifeSprite.draw(((this.lifeSprite.width-10) * i), 5);
	    for(var j=0; j < GM.CAN; j++){
	    	this.canSprite.draw( (ig.system.width-50)-j*30, 30);
	    }
	    this.font.draw("Timer",550,5);
	    var elapse = this.levelTimer.delta();
	    this.font.draw(elapse.toFixed(1),650,5);
	    //this.font.draw("Coins",300,5);
		this.coinSprite.draw(350,7);
	    this.font.draw(GM.COIN, 400, 10);
	}
});







// Start the Game with 60fps, a resolution of 600x600, scaled 1
StartScreen = ig.Game.extend({
	instructText: new ig.Font( 'media/04b03.font.png' ),
	//Start: new ig.Image('media/gamestart.png'),
	//Start: new ig.Image('media/new/screen/game_start_blink.png'),
	animSheet : new ig.AnimationSheet( 'media/new/screen/game_start_blink02.png', 759, 480 ),
	//anim : new ig.Animation( this.animSheet, 0.5, [0,1] ),
	anim : null,
	SPRINKLE_TIME_VALUE : 0.8,
	sprinkleTimer : new ig.Timer(this.SPRINKLE_TIME_VALUE),
	sprinkleFlag : false,
	
	init: function() {
		ig.input.bind( ig.KEY .SPACE, 'start');
		this.anim = new ig.Animation( this.animSheet, 0.8, [0,1] );
	},

	update: function() {
		if(ig.input.pressed ('start')){
			ig.system.setGame(MyGame);
		}
		this.parent();
	},
	
	draw: function() {
		
		this.parent();
	
		//var x = ig.system.width/2;
		//var y = ig.system.height/2;
		
		this.anim.update();
		//this.Start.draw(x - (this.Start.width * .5), y-260 ); //배경띄우기
		//this.anim.draw(x - (760 * .5), y-260 );
		this.anim.draw(0, 0);

		if (this.sprinkleTimer.delta() > this.SPRINKLE_TIME_VALUE){
			this.sprinkleTimer.reset();
			this.sprinkleFlag = !this.sprinkleFlag; 
		}
		
		//if(this.sprinkleFlag){
		//	this.instructText.draw( 'Press Spacebar To Start', x+157, y+100,
		//			ig.Font.ALIGN.CENTER );
		//}
		
		
	}//draw끝
}); //startscreen끝

GameOverScreen = ig.Game.extend({
		instructText: new ig.Font( 'media/04b03.font.png' ),
		GameOver: new ig.Image('media/gameover.png'),
		stats: {},
		animSheet : new ig.AnimationSheet('media/new/screen/game_over_blink.png',759,480),
		anim : null,
		SPRINKLE_TIME_VALUE : 0.8,
		sprinkleTimer : new ig.Timer(this.SPRINKLE_TIME_VALUE),
		sprinkleFlag : false,
		
		init: function() {
			ig.input.bind( ig.KEY.SPACE, 'start');
			this.stats = ig.finalStats;
			this.anim = new ig.Animation(this.animSheet, 0.8, [0,1]);
		},

		update: function() {
			
			this.parent();
			
			if(ig.input.pressed('start')){
				ig.system.setGame(StartScreen);
			}
			
			
	},
	draw: function() {
		var a = 1.0;
		var b = 1.0;
		this.parent();
		var x = ig.system.width/2;
		var y = ig.system.height/2 - 20;
		
		this.anim.update();
		this.anim.draw(0, 0);
		
		if(this.sprinkleTimer.delta() > this.SPRINKLE_TIME_VALUE){
			this.sprinkleTimer.reset();
			this.sprinkleFlag = !this.sprinkleFlag;
		}
		
		/*this.GameOver.draw(x - (this.GameOver.width * .5), y-200);*/
		var score = GM.COIN * a + parseInt(GM.GAME_TIMER) * b;//코인*알파+시간*베타
		//console.log(typeof(score));
		this.instructText.draw('Total Time : '+GM.GAME_TIMER, x, y, ig.Font.ALIGN.CENTER);
		this.instructText.draw('Total Coin : '+GM.COIN, x, y+25, ig.Font.ALIGN.CENTER);
		this.instructText.draw('Total Score: '+ score, x, y+50, ig.Font.ALIGN.CENTER);
		//this.instructText.draw('Press Spacebar To Continue.', x, y+70,ig.Font.ALIGN.CENTER);
	}
});


ig.main( '#canvas', StartScreen, 60,760, 480, 1 );


});
