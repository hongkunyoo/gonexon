ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.entity',
	'impact.collision-map',
	'impact.background-map',
	'game.entities.player',
	'game.entities.block',
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

	tiles: new ig.Image( 'media/tiles.png' ),
	timer: new ig.Timer(1),
	
	init: function() {
	  

        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.Z,'shoot');
		// Initialize your game here; bind keys etc.
	/*    ig.input.initMouse();
	    GM.loadLevel();*/
	    
	  	this.player = this.spawnEntity( EntityPlayer, 10, 16 );
		var block = this.spawnEntity(EntityBlock, ig.system.width, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 0, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 50, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 100, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 150, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 200, ig.system.height-10);
		var block = this.spawnEntity(EntityBlock, 250, ig.system.height-10);
		IM = new ItemManager();
		
		//var itemManager = new ItemManager();

	},

	update: function () {
	   // if (!GM.PAUSE) {
	        // Update all entities and backgroundMaps
	        var player = this.getEntitiesByType(EntityPlayer)[0];
	       

	        IM.update();
    		//this.screen.x= this.screen.x+1;
    	
			this.parent();
			
		if( this.timer.delta()>0 ){
			this.timer.reset();
			var block = this.spawnEntity(EntityBlock, ig.system.width, ig.system.height-10);
		}

		

	        // Manager ³»ºÎ update
	        //TM.update();
	        //BM.update();
	      //  GM.update();
	        //IM.update();
	    
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		//this.backdrop.draw();
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
