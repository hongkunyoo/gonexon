  ig.module(
	'game.entities.weapon'
)
.requires(
	'impact.entity',
	'game.entities.explosion'
)
.defines(function () {
	EntityBullet = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 50, y: 200},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        bounceCounter :0,
        bounciness: 0.6,
        name :'weapon',
        init: function( x, y, settings ) {
            this.parent( x + 8 , y+8, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.vel.y = -(50 + (Math.random()*100));
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){

            }
        },
        check: function( other ) {
    		this.bounceCounter++;
    		if( this.bounceCounter > 1 ) {
    			this.kill();
    		}
    		
    		
        },
        update: function () {
            this.parent();
            
        },
        kill: function(){ 	
            for(var i = 0; i < 20; i++) 	
                ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y); 	
            this.parent(); 	
        }	

    });
});