ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		size: {x:100, y:100},
		collides: ig.Entity.COLLIDES.ACTIVE,
		
		animSheet : new ig.AnimationSheet( 'media/player.png', 100, 100),
			
		init: function( x, y, settings ) {
				this.parent( x, y, settings );
				this.addAnim( 'idle', 1, [0,1,2,3,4,4,4,4,4,3,2,1]);
				this.vel.y =  -200;
				this.vel.y = 100;
			
			}
			
		
	});
});
