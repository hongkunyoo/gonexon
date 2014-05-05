ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.dorm1',
	'impact.debug.debug',
	'game.entities.manager'
	//'impact.font',
    //'game.entities.player',
   // 'game.manager.gameManager',
   // 'game.manager.itemManager'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 300,
	map:[],
	tiles: new ig.Image( 'media/tiles.png' ),
	timer: new ig.Timer(2),
	timer2: new ig.Timer(0.02),
	coinTimer: new ig.Timer(Math.random()*5+3),
	init: function() {
	  
        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.X, 'jump' );
        
		this.player = this.spawnEntity( EntityPlayer, 10, 16 );
		var block = this.spawnEntity(EntityBlock, ig.system.width, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 0, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 50, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 100, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 150, ig.system.height-10);
		this.coinManager = this.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
		
		//var itemManager = new ItemManager();
	},

	update: function () {
	   // if (!GM.PAUSE) {
	        // Update all entities and backgroundMaps
	        	var player = this.getEntitiesByType(EntityPlayer)[0];
    	if(player){

    		//this.screen.x= this.screen.x+1;
    	}
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
	        // Manager ³»ºÎ update
	        //TM.update();
	        //BM.update();
	      //  GM.update();
	        //IM.update();
	    
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
	    this.parent();

	    //this.font.draw("test",200,500);
		
	}
});

//GM = new GameManager();
//IM = new ItemManager();
//TM = new TouchManager();
//BM = new BlockManager();


// Start the Game with 60fps, a resolution of 600x600, scaled 1

//ig.main( '#canvas', MyGame, 60, 320, 240, 2 );
ig.main('#canvas', MyGame, 60,320, 240, 2 );
});
