  ig.module(
	'game.entities.explosion'
)
.requires(
	'impact.entity'
)
.defines(function () {
	EntityGrenadeParticle = ig.Entity.extend({ 	
		size: {x: 1, y: 1}, 	
		maxVel: {x: 160, y: 200}, 	
		lifetime: 1, 	
		fadetime: 1, 	
		bounciness: 1, 	
		vel: {x: 40, y: 50}, 	
		friction: {x:20, y: 20}, 	
		checkAgainst: ig.Entity.TYPE.B, 	
		collides: ig.Entity.COLLIDES.LITE, 	
		animSheet: new ig.AnimationSheet( 'media/explosion.png', 1, 1 ), 	
		name : 'explosion',
		init: function( x, y, settings ) { 	
			this.parent( x, y, settings ); 	
			this.vel.x = (Math.random() * 4 - 1) * this.vel.x; 	
			this.vel.y = (Math.random() * 10 - 1) * this.vel.y; 	
			this.idleTimer = new ig.Timer(); 	
			var frameID = Math.round(Math.random()*7); 	
			this.addAnim( 'idle', 0.2, [frameID] ); 	
		}, 	
		update: function() { 	
			if( this.idleTimer.delta() > this.lifetime ) { 	
				this.kill(); 	
				return; 	
			} 	
			this.currentAnim.alpha = this.idleTimer.delta().map( 	
				this.lifetime - this.fadetime, this.lifetime, 1, 0 ); 	
			this.parent(); 	
		}

	});	
	EntityEatHeart = ig.Entity.extend({ 	
		size: {x: 1, y: 1}, 	
		maxVel: {x: 160, y: 200},
		lifetime: 1, 	
		fadetime: 1, 	
		bounciness: 1, 	
		gravityFactor : 0,
		vel: {x: 40, y: 50}, 	
		friction: {x:20, y: 20}, 	
		checkAgainst: ig.Entity.TYPE.B, 	
		collides: ig.Entity.COLLIDES.LITE, 	
		animSheet: new ig.AnimationSheet( 'media/itemEffect/heart-01.png', 15, 15 ), 	
		name : 'explosion',
		init: function( x, y, settings ) { 	
			this.opacity = 50;
			this.parent( x, y, settings ); 	
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x; 	
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y; 	
			this.idleTimer = new ig.Timer(0.4);	
			this.addAnim( 'idle', 0.2, [0] ); 	
		}, 	
		update: function() { 	
			if( this.idleTimer.delta() > this.lifetime ) { 	
				this.kill(); 	
				return; 	
			} 	
			this.currentAnim.alpha = this.idleTimer.delta().map( 	
				this.lifetime - this.fadetime, this.lifetime, 1, 0 ); 	
			this.parent(); 	
		}

	});	


});