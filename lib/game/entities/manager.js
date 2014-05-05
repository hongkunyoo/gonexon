ig.module(
	'game.entities.manager'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function () {
	EntitycoinManager = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/coin_gold.png', 10, 10 ),
		gravityFactor: 0,
		timer: new ig.Timer(1.2),
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		size : {x : 15, y:15},
		maxVel: {x:100, y: 1000},
		state: 1,
		onBlocky: 0 ,
		
		
		init: function (x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.vel.y = 450;
			//timer.set(2);
			//this.accel.y = -300;
		},
		
		update: function(){
			this.parent();	
			
			
		},
		
		check: function (other) {
			this.stats = 0;
			for(var i = coinManager.pos.y ; i > 0 ; i = i- 10)
				coin = ig.game.spawnEntity(EntityCoin, coinManager.pos.x, i);
			onBlocky = coinManager.pos.y;
			this.kill();
        },
        
        draw: function() {
    		// Draw all entities and backgroundMaps
    	    this.parent();

    	    //this.font.draw("test",200,500);
    		
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
	
	
	ItemManager = ig.Class.extend({
		
		timer2: new ig.Timer(0.009),
		coinTimer: new ig.Timer(0.5),
		init: function(x,y,settings){
		coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
			
		},
		
		update: function(){

			/*if(this.timer2.delta()>0){
				this.timer2.reset();
				if(coinManager.stats != 0)
					coin = ig.game.spawnEntity(EntityCoin, coinManager.pos.x, coinManager.pos.y);
			}*/
			
			if(this.coinTimer.delta()>0){
				this.coinTimer.reset();
					coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
			}
			
			
		}
	});
	
	
	

});


