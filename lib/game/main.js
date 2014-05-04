ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.entities.player',
    'game.manager.gameManager',
    'game.manager.itemManager'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	level : null,
	
	gravity: 2000,
	//font: new ig.Font("media/04b03.font.png"),
	//wejolfjiweoifj
	init: function() {
	    // Initialize your game here; bind keys etc.
	    ig.input.initMouse();
	    ig.input.bind(ig.KEY.MOUSE1, 'touch');
	    ig.input.bind(ig.KEY.C, 'test');
	    ig.input.bind(ig.KEY.X, 'test2');
	    ig.input.bind(ig.KEY.A, 'pause');
        
	    GM.loadLevel();
	},
	
	update: function () {
	    if (!GM.PAUSE) {
	        // Update all entities and backgroundMaps
	        this.parent();

	        // Manager ³»ºÎ update
	        //TM.update();
	        //BM.update();
	        GM.update();
	        IM.update();
	    }
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
	    this.parent();

	    //this.font.draw("test",200,500);
		
	}
});

GM = new GameManager();
IM = new ItemManager();
//TM = new TouchManager();
//BM = new BlockManager();


// Start the Game with 60fps, a resolution of 600x600, scaled 1

ig.main( '#canvas', MyGame, 60, 600, 600, 1 );

});
