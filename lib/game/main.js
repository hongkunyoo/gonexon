//im seop
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
<<<<<<< HEAD
		// Initialize your game here; bind keys etc.

      // I'm Jin Hyung

	
=======

		// I am yoonhee:)

>>>>>>> a90667ef277651a3c2d1a4ea4eec4e538e43b619

		var settings = {health: 100, size: {x: 50, y: 50}};
		//var settings = {};

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
		
		//this.font.draw( 'Hello World :)', x, y, ig.Font.ALIGN.RIGHT );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
