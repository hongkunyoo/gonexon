ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity'
)
.defines(function () {
EntityCoin = ig.Entity.extend({


    itemType : 1,
	animSheet : new ig.AnimationSheet('media/gold_coin.png', 27,27),	                  
    size: { x: 27, y: 27 },
    maxVel: {x: 10000, y: 10000},
	gravityFactor:0,
	stats : 0,
	checkAgainst: ig.Entity.TYPE.B,
	init: function(x,y,settings){
		GM = new GameManager();
		this.parent(x,y,settings);
		this.addAnim('idle', 0.05, [0,1,2,3,4,5,6,7]);
		this.currentAnim = this.anims.idle;
		this.vel.x = GM.itemSpeed;
	},
	check: function(other){
		if(other.name == 'player'){
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
