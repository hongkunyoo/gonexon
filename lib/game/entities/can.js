ig.module(
	'game.entities.can'
)
.requires(
	'impact.entity',
	'game.entities.explosion'
)
.defines(function () {
	EntityCan = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/new/item/can.png', 42, 43 ),
        size: {x: 37, y: 38},
        offset: {x: 5, y: 5},
        maxVel: {x: 1000, y: 1000},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        bounceCounter : 0,
        bounciness: 0.7,
        sound: new ig.Sound( 'media/sound/ogg/can.ogg' ),
        name :'weapon',
        isThrowable: true,
        
        init: function( x, y, settings ) {
            this.parent( x + 50 , y+8, settings );
            
            if (this.isThrowable)
            this.vel.y = -300;
            this.addAnim( 'idle', 0.02, [0,1,2,3,4,5] );
            
            if (this.isThrowable)
            	this.sound.play();
        },
        check: function( other ) {
        	
        	if (this.isThrowable){
        		if( other instanceof EntityMonster01 || other instanceof EntityMonster02 ){
    				this.kill();
    				if (other.onDestory != null)
    					other.onDestory();
    			}
        	}
        },
        update: function () {
            this.parent();
            
            if (this.pos.x < -1000 || this.pos.y > ig.system.realHeight + 100) {
            	this.kill();
            }
            
        },
        kill: function(){
        	if (this.isThrowable){
        		for(var i = 0; i < 20; i++) 	
                    ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);
        	}
			
            this.parent(); 	
        },
        collideWith: function (other, axis) {
        	
        	if (this.isThrowable){
        		this.bounceCounter++;
        		if( this.bounceCounter > 2 ) {
        			this.kill();
        		}
        	}
        }

    });
	
	
});