ig.module(
	'game.entities.manager'
)
.requires(
	'impact.game',
	'impact.entity',
	'game.managers.gameManager'
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
			this.kill();
			console.log("DEATH");
        },
        draw: function() {
    		// Draw all entities and backgroundMaps
    	    this.parent();

    	    //this.font.draw("test",200,500);
    		
    	}

	});
	
	
	
	ItemManager = ig.Class.extend({
		timer2: new ig.Timer(0.04),
		coinTimer: new ig.Timer(1.1),
		init: function(x,y,settings){
			coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
			
		},
		
		update: function(){

			if(this.timer2.delta()>0){
				this.timer2.reset();
				if(coinManager.stats != 0)
					coin = ig.game.spawnEntity(EntityCoin, coinManager.pos.x, coinManager.pos.y);
			}
			
			if(this.coinTimer.delta()>0){
				this.coinTimer.reset();
					coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
			}
			
			
		}
	});
});


