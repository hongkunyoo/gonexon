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
		// Initialize your game here; bind keys etc.

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
