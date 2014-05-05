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
    //'game.entities.player',
    'game.managers.gameManager'
   // 'game.manager.itemManager'
)
.defines(function(){

MyGame = ig.Game.extend({
	// Load a font
//	level : null,
	
	//gravity: 2000,
	statText: new ig.Font( 'media/04b03.font.png' ),
	showStats: false,
	levelTimer: new ig.Timer(),
	levelExit: null,
	stats: {time: 0, kills: 0, deaths: 0},
	
	gravity: 300,
	lifeSprite : new ig.Image("media/heart_small.png"),
	gameoverSprite : new ig.Image("media/gameover.png"),
	font: new ig.Font("media/04b03.font.png"),
	
	init: function() {
	  
		  this.loadLevel( LevelDorm1 );
        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.X, 'jump' );
        ig.input.bind( ig.KEY.Z, 'test');
        ig.input.bind( ig.KEY.SPACE, 'continue' );
        
        
        GM.HEART = 3;
        // Initialize your game here; bind keys etc.
	/*    ig.input.initMouse();
	    ig.input.bind(ig.KEY.MOUSE1, 'touch');
	    ig.input.bind(ig.KEY.C, 'test');
	    ig.input.bind(ig.KEY.X, 'test2');
	    ig.input.bind(ig.KEY.A, 'pause');
        
	    GM.loadLevel();*/

	},
	
	loadLevel: function( data ) {
		this.parent(data);
		this.levelTimer.reset();
		},
		
	update: function () {
	   // if (!GM.PAUSE) {
	        // Update all entities and backgroundMaps
		if(!this.showStats){
			this.parent();
			}	else{
				if(ig.input.state('continue')){
					this.showStats = false;
					this.levelExit.nextLevel();
					this.parent();
				}
			}
		
		
		
		var player = this.getEntitiesByType(EntityPlayer)[0];
    	if(player){
    		this.screen.x = player.pos.x - ig.system.width/2;
    		this.screen.y = player.pos.y - ig.system.height/2;
    	}
		this.parent();
		
		if (ig.input.pressed("test")){
			//console.log("test!");
			//ig.game.spawnEntity(EntityuiHeart,player.pos.x,player.pos.y,{});
			GM.decreaseHeart();
		}
	
	        // Manager ³»ºÎ update
	        //TM.update();
	        //BM.update();
	      //  GM.update();
	        //IM.update();
	    
	},
	
	toggleStats: function(levelExit){
		this.showStats = true;
		this.stats.time = Math.round(this.levelTimer.delta());
		this.levelExit = levelExit;
		},
	
	draw: function() {
		// Draw all entities and backgroundMaps
	    this.parent();
	    this.font.draw("Lives",5,5);
	    for(var i=0; i < GM.HEART; i++)
	    	this.lifeSprite.draw(((this.lifeSprite.width + 2) * i)+5, 15);
	    
	    
		
	}
});

GM = new GameManager();
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
				ig.system.setGame(StartScreen)
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

});
