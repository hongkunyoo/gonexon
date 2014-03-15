ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		size: {x:48, y:48},
		collides: ig.Entity.COLLIDES.ACTIVE,
		
		animSheet : new ig.AnimationSheet( 'media/player.png', 48, 48),
			
		init: function( x, y, settings ) {
				this.parent( x, y, settings );
				this.addAnim( 'idle', 1, [0,1,2,3,4,4,4,4,4,3,2,1]);
				this.vel.y =  -200;
				this.vel.y = 100;
			
			}
			
		
	});
});
