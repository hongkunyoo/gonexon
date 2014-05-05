ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.dorm1',
	'impact.debug.debug',
	'game.ui.uiHeart',
	'impact.font',
	'impact.timer',
	'impact.entity',
	'impact.collision-map',
	'impact.background-map',
	'game.entities.player',
	'game.entities.block',
	'impact.debug.debug',
	'game.entities.manager',

	//'impact.font',
    //'game.entities.player',
    'game.managers.gameManager'
   // 'game.manager.itemManager'
)
.defines(function(){
MyGame = ig.Game.extend({

	statText: new ig.Font( 'media/04b03.font.png' ),
	showStats: false,
	levelTimer: new ig.Timer(),
	levelExit: null,
	stats: {time: 0, kills: 0, deaths: 0},
	
	gravity: 300,
	lifeSprite : new ig.Image("media/heart_small.png"),
	gameoverSprite : new ig.Image("media/gameover.png"),
	font: new ig.Font("media/04b03.font.png"),

	tiles: new ig.Image( 'media/tiles.png' ),
	timer: new ig.Timer(2),
	timer2: new ig.Timer(0.02),
	coinTimer: new ig.Timer(Math.random()*5+3),

	
	init: function() {
		GM = new GameManager();
        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.X, 'jump' );
        
        ig.input.bind( ig.KEY.A, 'test');
        ig.input.bind( ig.KEY.SPACE, 'continue' );
        
        GM.HEART = 3;

	    //GM.loadLevel();
        
	    ig.input.bind( ig.KEY.Z,'shoot');
	  	this.player = this.spawnEntity( EntityPlayer, 10, 16 );
		var block = this.spawnEntity(EntityBlock, ig.system.width, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 0, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 50, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 100, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 150, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 200, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 250, ig.system.height-10);
		this.coinManager = this.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
		
		//var itemManager = new ItemManager();

	},
	
	loadLevel: function( data ) {
		this.parent(data);
		this.levelTimer.reset();
	},
		
	update: function () {
	  
		//var player = this.getEntitiesByType(EntityPlayer)[0];
	       
    	
		//this.screen.x= this.screen.x+1;
	
		this.parent();
		
		if( this.timer.delta()>0 ){
			this.timer.reset();
			var block = this.spawnEntity(EntityBlock, ig.system.width, ig.system.height-10);
			
		}
	
		if(this.timer2.delta()>0){
			this.timer2.reset();
			if(this.coinManager.stats != 0)
				this.coin = this.spawnEntity(EntityCoin, this.coinManager.pos.x, this.coinManager.pos.y);
		}
		
		if(this.coinTimer.delta()>0){
			this.coinTimer.reset();
			this.coinManager = this.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
		}
	
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
			console.log("decreaseHeart");
			GM.decreaseHeart();
		}
	},
	
	toggleStats: function(levelExit){
		this.showStats = true;
		this.stats.time = Math.round(this.levelTimer.delta());
		this.levelExit = levelExit;
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		//this.backdrop.draw();
	    this.parent();
	    this.font.draw("Lives",5,5);
	    for(var i=0; i < GM.HEART; i++)
	    	this.lifeSprite.draw(((this.lifeSprite.width + 2) * i)+5, 15);	
	}
});


//IM = new ItemManager();
//TM = new TouchManager();
//BM = new BlockManager();
//ig.system.setGame(GameOverScreen);

// Start the Game with 60fps, a resolution of 600x600, scaled 1
StartScreen = ig.Game.extend({
		instructText: new ig.Font( 'media/04b03.font.png' ),
		Start: new ig.Image('media/gamestart.png'),
		init: function() {
			ig.input.bind( ig.KEY.SPACE, 'start');
		},
	
		update: function() {
			if(ig.input.pressed ('start')){
				ig.system.setGame(MyGame);
			}
			this.parent();
		},
		
		draw: function() {
			
			this.parent();
			var x = ig.system.width/2;
			var y = ig.system.height/2-20;
			this.Start.draw(x - (this.Start.width * .5), y -30);
			
			this.instructText.draw( 'Press Spacebar To Start', x+40, y-40,
			ig.Font.ALIGN.CENTER );
		}
});
GameOverScreen = ig.Game.extend({
		instructText: new ig.Font( 'media/04b03.font.png' ),
		//background: new ig.Image('media/screen-bg.png'),
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
		this.parent();
		var x = ig.system.width/2;
		var y = ig.system.height/2 - 20;
		this.GameOver.draw(x - (this.GameOver.width * .5), y-50);
		
		if(this.showStats){
	    	//this.statMatte.draw(0,0);
	    	var x = ig.system.width/2;
	    	var y = ig.system.height/2 - 20;
	    	this. statText.draw('Level Complete', x, y, ig.Font.ALIGN.CENTER);
	    	this. statText.draw('Time: '+this.stats.time, x, y+30, ig.Font.ALIGN.CENTER);
	    	this. statText.draw('Kills: '+this.stats.kills, x, y+40, ig.Font.ALIGN.CENTER);
	    	this. statText.draw('Deaths: '+this.stats.deaths, x, y+50, ig.Font.ALIGN.CENTER);
	    	this. statText.draw('Press Spacebar to continue.', x, ig.system.height - 10,
	    	ig.Font.ALIGN.CENTER);
	    	}
	    	
	}
});

ig.main( '#canvas', StartScreen, 60, 320, 240, 2 );

//ig.main('#canvas', MyGame, 60,320, 240, 2 );

});
