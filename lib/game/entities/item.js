ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity',
	'impact.sound',
	'game.entities.explosion'
)
.defines(function () {

EntityStar = ig.Entity.extend({
    itemType : 1,
	name : 'star',
	animSheet : new ig.AnimationSheet('media/new_img/heart-01.png',28,28),	                  
    size: { x: 27, y: 27 },
    maxVel: {x: 10000, y: 10000},
	gravityFactor:0,
	stats : 0,
	checkAgainst: ig.Entity.TYPE.B,
	sound: new ig.Sound( 'media/itemEffect/sound/Coin.ogg' ),

	init: function(x,y,settings){
		GM = new GameManager();
		this.parent(x,y,settings);
		this.addAnim('idle', 0.05, [0]);
		this.currentAnim = this.anims.idle;
		this.vel.x = GM.itemSpeed;
	},
	check: function(other){
		if(other.name == 'player'){
			this.sound.play();
			GM.addCoin();
			GM.shakeScreen();
			ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
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

EntityRice = ig.Entity.extend({
	gravityFactor : 0,
    itemType : 1,
	name : 'rice',
	animSheet : new ig.AnimationSheet('media/new_img/bob.png',28,28),	                  
    size: { x: 27, y: 27 },
    maxVel: {x: 10000, y: 10000},
	gravityFactor:0,
	stats : 0,
	checkAgainst: ig.Entity.TYPE.B,

	init: function(x,y,settings){
		GM = new GameManager();
		this.parent(x,y,settings);
		this.addAnim('idle', 0.05, [0]);
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
