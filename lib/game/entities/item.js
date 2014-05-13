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
            GM = new GameManager();
            EM = new EarthManager();
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
	

    
    itemType : 1,
    animSheet : new ig.AnimationSheet('media/gold_coin.png', 27,27),	                  
    size: { x: 27, y: 270 },
    maxVel: {x: 10000, y: 10000},
    collides: ig.Entity.COLLIDES.FIXED,
	size: {x: 27, y:27},
	gravityFactor:0,
	maxVel: {x:1000, y:1000},
	stats : 0,
	checkAgainst: ig.Entity.TYPE.B,
	init: function(x,y,settings){
		this.addAnim('idle', 0.05, [0,1,2,3,4,5,6,7]);
		this.parent(x,y,settings);
		this.currentAnim = this.anims.idle;
        GM = new GameManager();
        EM = new EarthManager();
		this.vel.x = GM.earthSpeed.x;
	},
	check: function(other){
		//this.parent(x,y,settings);
		if(other.name == 'player'){
			GM = new GameManager();
			GM.addCoin();
			GM.shakeScreen();
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
