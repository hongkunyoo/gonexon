ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.ui.uiHeart',
	'impact.font',
	'impact.timer',
	'impact.collision-map',
	'impact.background-map',
	'game.entities.player',
	'game.entities.block',
	'impact.debug.debug',
    'game.managers.gameManager',
    'game.managers.itemManager',
    'game.entities.monster',
    'game.managers.earthManager',
    'game.managers.blockManager',
    'game.entities.spring',
    'game.ui.uiMessage'
)

.defines(function(){
MyGame = ig.Game.extend({

	//statText: new ig.Font( 'media/04b03.font.png' ),
	//showStats: false,
	//statMatte: new ig.Image('media/gray.png'),
	levelTimer: new ig.Timer(),
	levelExit: null,
	stats: {time: 0 /*,kills: 0, deaths: 0*/},
	
	gravity: 300,
	
	lifeSprite : new ig.Image("media/heart_small.png"),
	gameoverSprite : new ig.Image("media/gameover.png"),
	font: new ig.Font("media/04b03.font.png"),
	tiles: new ig.Image( 'media/tiles.png' ),

	timer: new ig.Timer(1.2),

	
	
	init: function() {
		GM = new GameManager();
		IM = new ItemManager();
		EM = new EarthManager();
		BM = new BlockManager();
		IM = new ItemManager();
		
		GM.myInit();
		IM.myInit();
		EM.myInit();
		BM.myInit();
		
        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.Z,'shoot');
        ig.input.bind( ig.KEY.A, 'test');
        ig.input.bind( ig.KEY.SPACE, 'continue' );
        GM.HEART = 3;
        
	  	this.player = this.spawnEntity( EntityPlayer, 10, 16 );

	    this.monster = this.spawnEntity( EntityMonster, 300,400);
		this.levelTimer.reset();
		

	},
	
	loadLevel: function( data ) {
		this.stats={time: 0/*, kills: 0, deaths: 0*/};
		this.parent(data);
		this.levelTimer.reset();
	},
		
	update: function () {
	   // if (!GM.PAUSE) {
	        // Update all entities and backgroundMaps
	        var player = this.getEntitiesByType(EntityPlayer)[0];
	        IM.update();
	        EM.update();
	        BM.update();
	        GM.update();
	        
    		//this.screen.x= this.screen.x+1;
			this.parent();
			
		//var player = this.getEntitiesByType(EntityPlayer)[0];
	       
    	
		//this.screen.x= this.screen.x+1;
	
	//	this.parent();
		
//		if( this.timer.delta()>0 ){
//			this.timer.reset();
//			var block = this.spawnEntity(EntityBlock, ig.system.width, ig.system.height-10);
//		}
		

	     
	
		// Update all entities and backgroundMaps
		if(!this.showStats){
			this.parent();
		}else{
			if(ig.input.state('continue')){
				this.showStats = false;
				this.levelExit.nextLevel();
				this.parent();
			}
		}
		
		if (ig.input.pressed("test")){
			//GM.decreaseHeart();
			
			var message = ig.game.spawnEntity(EntityUiMessage, this.player.pos.x, this.player.pos.y, {message : "Hi~"});
			//message.message = "Hello World!";
		}
	},
	
	toggleStats: function(levelExit){
		this.showStats = true;
		this.stats.time = Math.round(this.levelTimer.delta());
		this.levelExit = levelExit;
	},
	
	check: function(other) {
		if (other instanceof EntityPlayer) {
		ig.game.toggleStats(this);
		}
	},
	nextLevel: function(){
		if (this.level) {
		var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function(m, l, a, b) {
		return a.toUpperCase() + b;
		});
		ig.game.loadLevelDeferred(ig.global['Level' + levelName]);
		}
	},
		
	draw: function() {
		// Draw all entities and backgroundMaps
		//this.backdrop.draw();

	    this.parent();
	    GM.draw();
	    this.font.draw("Lives",5,5);
	    for(var i=0; i < GM.HEART; i++)
	    	this.lifeSprite.draw(((this.lifeSprite.width + 2) * i)+5, 30);	
	    this.font.draw("Timer",550,5);
	    var elapse = this.levelTimer.delta();
	    this.font.draw(elapse.toFixed(1),650,5);
	    
	    this.font.draw("Coins",300,5);
	    this.font.draw(GM.COIN,400,5);
	    
	}
});



// Start the Game with 60fps, a resolution of 600x600, scaled 1
StartScreen = ig.Game.extend({
		instructText: new ig.Font( 'media/04b03.font.png' ),
		Start: new ig.Image('media/gamestart.png'),
		SPRINKLE_TIME_VALUE : 0.5,
		sprinkleTimer : new ig.Timer(this.SPRINKLE_TIME_VALUE),
		sprinkleFlag : false,
		
		init: function() {
			ig.input.bind( ig.KEY .SPACE, 'start');
		},
	
		update: function() {
			if(ig.input.pressed ('start')){
				ig.system.setGame(MyGame);
				//ig.system.setGameNow(MyGame);
			}
			this.parent();
		},
		
		draw: function() {
			
			this.parent();
		
			var x = ig.system.width/2;
			var y = ig.system.height/2;
			
			this.Start.draw(x - (this.Start.width * .5), y-260 ); //배경띄우기
			
			if (this.sprinkleTimer.delta() > this.SPRINKLE_TIME_VALUE){
				this.sprinkleTimer.reset();
				this.sprinkleFlag = !this.sprinkleFlag; 
			}
			
			if(this.sprinkleFlag){
				this.instructText.draw( 'Press Spacebar To Start', x+157, y+100,
						ig.Font.ALIGN.CENTER );
			}
			
			
		}//draw끝
}); //startscreen끝
GameOverScreen = ig.Game.extend({
		instructText: new ig.Font( 'media/04b03.font.png' ),
		GameOver: new ig.Image('media/gameover.png'),
		stats: {},
	
		init: function() {
	
			ig.input.bind( ig.KEY.SPACE, 'start');
			this.stats = ig.finalStats;
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
		this.GameOver.draw(x - (this.GameOver.width * .5), y-200);
		var score = GM.COIN * a + parseInt(GM.GAME_TIMER) * b;//코인*알파+시간*베타
		//console.log(typeof(score));
		this.instructText.draw('Total Time : '+GM.GAME_TIMER, x, y, ig.Font.ALIGN.CENTER);
		this.instructText.draw('Total Coin : '+GM.COIN, x, y+25, ig.Font.ALIGN.CENTER);
		this.instructText.draw('Total Score: '+ score, x, y+50, ig.Font.ALIGN.CENTER);
		//this.instructText.draw('Press Spacebar To Continue.', x, y+70,ig.Font.ALIGN.CENTER);
	}
});


ig.main( '#canvas', StartScreen, 60, 760, 480, 1 );


});
