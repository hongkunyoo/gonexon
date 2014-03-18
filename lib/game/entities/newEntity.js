ig.module(
	'game.entities.newEntity'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    size: {x: 11, y: 7},
    health: 50,
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/player.png', 204, 185 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.5, [0,1,2] );
        //this.addAnim( 'jump', 0.1, [3,4,5] );
        
        // Call the parent constructor
        this.parent( x, y, settings );
    }

});


});