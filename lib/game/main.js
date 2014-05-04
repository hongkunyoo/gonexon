ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.dorm1',
	'impact.debug.debug'
	//'impact.font',
    //'game.entities.player',
   // 'game.manager.gameManager',
   // 'game.manager.itemManager'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
//	level : null,
	
	//gravity: 2000,
	gravity: 300,
	//font: new ig.Font("media/04b03.font.png"),
	//wejolfjiweoifj
	init: function() {
	  
		  this.loadLevel( LevelDorm1 );
        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.X, 'jump' );
		// Initialize your game here; bind keys etc.
	/*    ig.input.initMouse();
	    ig.input.bind(ig.KEY.MOUSE1, 'touch');
	    ig.input.bind(ig.KEY.C, 'test');
	    ig.input.bind(ig.KEY.X, 'test2');
	    ig.input.bind(ig.KEY.A, 'pause');
        
	    GM.loadLevel();*/

	},
	
	update: function () {
	   // if (!GM.PAUSE) {
	        // Update all entities and backgroundMaps
	        	var player = this.getEntitiesByType(EntityPlayer)[0];
    	if(player){
    		this.screen.x = player.pos.x - ig.system.width/2;
    		this.screen.y = player.pos.y - ig.system.height/2;
    	}
			this.parent();
	
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

ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
