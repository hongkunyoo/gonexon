ig.module(
	'game.entities.back'
)
.requires(
	'impact.entity'
)
.defines(function () {
	
	EntityBack = ig.Entity.extend({
		
		animSheet: new ig.AnimationSheet( 'media/background.png', 760, 480 ),
		zIndex : -10,
        collides: ig.Entity.COLLIDES.NEVER,        
        gravityFactor: 0,       
        
        init: function (x, y, settings) {
			console.log('init back!');
			this.addAnim('idle', 0, [0]);
        },

        update: function () {
        	
        }
    });
});
