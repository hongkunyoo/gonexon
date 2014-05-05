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

EntityCoin = ig.Entity.extend({
	animSheet : new ig.AnimationSheet('media/coin_gold.png', 10,10),
	size: {x: 10, y:10},
	gravityFactor:0,
	stats : 0,
	checkAgainst: ig.Entity.TYPE.B,
	init: function(x,y,settings){
		this.parent(x,y,settings);
		this.addAnim('idle', 0.05, [0,1,2,3,4,5,6,7]);
		this.currentAnim = this.anims.idle;
		this.vel.x = -15;
	},
	check: function(other){
		if(other.name == 'player'){
			GM = new GameManager();
			GM.addCoin();
			this.kill();
		}
	},
	update: function(x,y,settings){
		this.parent(x,y,settings);
		if(this.pos.x<-10){
			this.kill();
		}
		
		
	}
});



});
