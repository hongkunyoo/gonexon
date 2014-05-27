  ig.module(
	'game.entities.weapon'
)
.requires(
	'impact.entity',
	'game.entities.explosion'
)
.defines(function () {
	EntityBullet = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/1.png', 34, 34 ),
        size: {x: 34, y: 34},
        maxVel: {x: 200, y: 200},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        bounceCounter :0,
        bounciness: 0.6,
        name :'weapon',
        init: function( x, y, settings ) {
            this.parent( x + 50 , y+8, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.vel.y = -(50 + (Math.random()*100));
            this.addAnim( 'idle', 1, [0,1,2,3] );
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
			if( other instanceof EntityMonster ){
				this.kill();
				other.kill();
			}
    		
    		
        },
        update: function () {
            this.parent();
        //	this.currentAnim = this.anims.idle;
            
        },
        kill: function(){ 	
            for(var i = 0; i < 20; i++) 	
                ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y); 	
            this.parent(); 	
        }	

    });
	
	
});