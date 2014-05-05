ig.module(
	'game.entities.manager'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function () {
	EntitycoinManager = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/coin.png', 15, 15 ),
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
        },
        draw: function() {
    		// Draw all entities and backgroundMaps
    	    this.parent();

    	    //this.font.draw("test",200,500);
    		
    	}

	});
	EntityCoin = ig.Entity.extend({
		animSheet : new ig.AnimationSheet('media/coin.png', 15,15),
		gravityFactor:0,
		checkAgainst: ig.Entity.TYPE.B,
		init: function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.vel.x = -15;
		},
		check: function(other){
			if(other.name == 'player'){
				other.vel.x = other.vel.x + 5;
			//	console.log("hihi");
				this.kill();
		}
		}
	/*	pickup: function() {
			console.log("hi");
				this.kill();
		}*/
	});
	/*var ItemManager = ig.Class.extend({

		coinmanager: this.spawnEntity(EntityCoin,  140, 0), 
		update: function(){
			if(coinManager==null)
				coinmanager= this.spawnEntity(EntityCoin,  ig.system.width-10, 0);
			if( coinManager.timer.delta()>0 ){
				coinManager.timer.reset();
				this.coin = this.spawnEntity(EntityCoin, coinManager.pos.x, coinManager.pos.y);
			}			
		}
	});*/
	
	
	

});


