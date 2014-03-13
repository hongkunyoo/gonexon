ig.module( 
	'game.entities.MyEntity'
)
.requires(
	'impact.entity'
)
.defines(function(){

	// Create your own entity, subclassed from ig.Enitity
	EntityPlayer = ig.Entity.extend({

		// Set some of the properties
		collides: ig.Entity.COLLIDES.ACTIVE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,

		size: {x: 16, y: 16},
		health: 50,
		
		// Load an animation sheet
		animSheet: new ig.AnimationSheet( 'C:\Users\Public\Pictures\Sample Pictures\Æ«¸³.jpg', 16, 16 ),
		
		init: function( x, y, settings ) {
			// Add animations for the animation sheet
			this.addAnim( 'jump', 0.1, [0,1,2] );
			//this.addAnim( 'jump', 0.1, [3,4,5] );
			
			// Call the parent constructor
			this.parent( x, y, settings );
		},
		
		update: function() {
			// This method is called for every frame on each entity.
			// React to input, or compute the entity's AI here.
		
			this.parent(); 
		}
	});

});
