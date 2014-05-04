ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity'
)
.defines(function () {
EntityItem = ig.Entity.extend({
	 animSheet: new ig.AnimationSheet( 'media/item.png', 5, 5 ),  
	 size: {x: 5, y: 5},
     maxVel: {x: 0, y: 0},
     vel: {x: 0, y: 0},
     checkAgainst: ig.Entity.TYPE.B,
     collides: ig.Entity.COLLIDES.LITE,
     type: ig.Entity.TYPE.B,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );

            this.addAnim( 'idle', 1,[1]);
        },
        handleMovementTrace: function(res) {
			this.parent(res);
			if(res.collision.x || res.collision.y){
				this.kill();
			}
		},
	pickup: function() {
	console.log("hi");
		this.kill();
	}
    });
});
