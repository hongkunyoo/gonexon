ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	'game.entities.newEntity'
)
.defines(function(){

MyGame = ig.Game.extend({
	init: function() {
		// Initialize your game here; bind keys etc.
<<<<<<< HEAD
		var settings = {health: 100, size: {x: 50, y: 50}};
		//var settings = {};
		ig.game.spawnEntity( EntityPlayer, 170, 7, settings );
||||||| merged common ancestors
		//var settings = {health: 100, vel: {x: 200, y: 100}};
		var settings = {};
		ig.game.spawnEntity( EntityPlayer, 10, 10, settings );
=======
//		this.backgroundImage = new ig.Image( 'media/background.png' );
		var settings = {};
		ig.game.spawnEntity( EntityPlayer, 40, 10, settings );

>>>>>>> d604a75fae46f60f81c434a9f6d9ebea02e6ff29
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/1.5,
			y = ig.system.height/1.5;
		
<<<<<<< HEAD
		this.font.draw( 'Hello World :)', x, y, ig.Font.ALIGN.RIGHT );
||||||| merged common ancestors
		this.font.draw( 'It Works! Hello Word!!', x, y, ig.Font.ALIGN.CENTER );
=======
>>>>>>> d604a75fae46f60f81c434a9f6d9ebea02e6ff29
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
