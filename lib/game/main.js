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
	'impact.debug.debug'
	//'impact.font',
    //'game.entities.player',
   // 'game.manager.gameManager',
   // 'game.manager.itemManager'
)
.defines(function(){
MyGame = ig.Game.extend({
	gravity: 300,
	timer: new ig.Timer(2),
	
	init: function() {
	  
		 // this.loadLevel( LevelDorm1 );
        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.X, 'jump' );
        ig.input.bind( ig.KEY.Z,'shoot');
		// Initialize your game here; bind keys etc.
	/*    ig.input.initMouse();
	    GM.loadLevel();*/
   
        this.player = this.spawnEntity( EntityPlayer, ig.system.width/2-50, 12 );
        this.block = this.spawnEntity( EntityBlock, ig.system.width-100, ig.system.height-10 );
	},

	update: function () {
	   // if (!GM.PAUSE) {
	        // Update all entities and backgroundMaps
	        	var player = this.getEntitiesByType(EntityPlayer)[0];
	       
    	if(player){
    		//this.screen.x = player.pos.x - ig.system.width/2;
    		//this.screen.y = player.pos.y - ig.system.height/2;
    	}
    	
    	if(this.timer.delta()>0){
    		this.timer.reset();
    		
    		this.block = this.spawnEntity( EntityBlock, ig.system.width, ig.system.height-10 );
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

ig.main( '#canvas', MyGame,  120, 150, 96, 5 );

});
