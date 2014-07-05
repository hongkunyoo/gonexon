ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity',
	'impact.sound',
	'game.entities.explosion'
)
.defines(function () {
	
	EntityItem = ig.Entity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		gravityFactor:0,
		
		_init: null,
		_update: null,
		
		maxVel: { x: 10000, y: 10000 },
		
		init: function(x, y, settings){
			this.parent(x, y, settings);
			
			if (this._init != null) this._init();
		},
		
		update: function () {
			this.parent();
			
			if (this._update != null) this._update();
			
			if (this.pos.x < -1000 || this.pos.y > ig.system.realHeight + 100) {
            	this.kill();
            }
		}
	});

	/*
	EntityF = ig.Entity.extend({
		itemType : 1,
		name : 'f',
		animSheet : new ig.AnimationSheet('media/new_img/f-01.png',28,28),	                  
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
				//ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
				this.kill();
			}
		},
		update: function(x,y,settings){
			this.parent(x,y,settings);
			this.vel.x = GM.itemSpeed;
			if(this.pos.x<-10){
				this.kill();
			}
		}
	});
	
	EntityA = ig.Entity.extend({
		itemType : 1,
		name : 'aplus',
		animSheet : new ig.AnimationSheet('media/new_img/A-01.png',28,28),	                  
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
				//ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
				this.kill();
			}
		},
		update: function(x,y,settings){
			this.parent(x,y,settings);
			this.vel.x = GM.itemSpeed;
			if(this.pos.x<-10){
				this.kill();
			}
		}
	});
	
	EntityBreak = ig.Entity.extend({
		itemType : 1,
		name : 'heartbreak',
		animSheet : new ig.AnimationSheet('media/new_img/heartbreak-01.png',28,28),	                  
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
				ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
				this.kill();
			}
		},
		update: function(x,y,settings){
			this.parent(x,y,settings);
			this.vel.x = GM.itemSpeed;
			if(this.pos.x<-10){
				this.kill();
			}
		}
	});
	
	EntityHeart = ig.Entity.extend({
		itemType : 1,
		name : 'heart',
		animSheet : new ig.AnimationSheet('media/new/item/heart.png',28,28),	                  
		size: { x: 27, y: 27 },
		maxVel: {x: 10000, y: 10000},
		gravityFactor:0,
		stats : 0,
		checkAgainst: ig.Entity.TYPE.B,

		init: function(x,y,settings){
			GM = new GameManager();
			this.parent(x,y,settings);
			this.addAnim('idle', 0.2, [0,1,2,3,4]);
			this.currentAnim = this.anims.idle;
			this.vel.x = GM.itemSpeed;
		},
		check: function(other){
			if(other.name == 'player'){
				GM.addCoin();
				GM.shakeScreen();
				ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
				this.kill();
			}
		},
		update: function(x,y,settings){
			this.parent(x,y,settings);
			this.vel.x = GM.itemSpeed;
			if(this.pos.x<-10){
				this.kill();
			}
		}
	});
	
	EntityStar = ig.Entity.extend({
		itemType : 1,
		name : 'star',
		animSheet : new ig.AnimationSheet('media/new/item/star.png',28,28),	                  
		size: { x: 27, y: 27 },
		maxVel: {x: 10000, y: 10000},
		gravityFactor:0,
		stats : 0,
		checkAgainst: ig.Entity.TYPE.B,
		sound: new ig.Sound( 'media/itemEffect/sound/Coin.ogg' ),

		init: function(x,y,settings){
			GM = new GameManager();
			this.parent(x,y,settings);
			this.addAnim('idle', 0.2, [0,1,2,3,4]);
			this.currentAnim = this.anims.idle;
			this.vel.x = GM.itemSpeed;
		},
		check: function(other){
			if(other.name == 'player'){
				this.sound.play();
				GM.addCoin();
				GM.shakeScreen();
				//ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
				this.kill();
			}
		},
		update: function(x,y,settings){
			this.parent(x,y,settings);
			this.vel.x = GM.itemSpeed;
			if(this.pos.x<-10){
				this.kill();
			}
			
		}
	});

	EntityRice = ig.Entity.extend({
		itemType : 1,
		name : 'rice',
		animSheet : new ig.AnimationSheet('media/new/item/coin.png',28,28),	                  
		size: { x: 27, y: 27 },
		maxVel: {x: 10000, y: 10000},
		gravityFactor:0,
		stats : 0,
		checkAgainst: ig.Entity.TYPE.B,

		init: function(x,y,settings){
			GM = new GameManager();
			this.parent(x,y,settings);
			this.addAnim('idle', 0.2, [0]);
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
			this.vel.x = GM.itemSpeed;
			if(this.pos.x<-10){
				this.kill();
			}
			
		}
	});
	 */
});
