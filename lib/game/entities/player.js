ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.item',
	'game.entities.weapon'
)
.defines(function () {

    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/real.png', 40, 30 ),
        size: {x: 20, y:25},
        offset: {x: 0, y: 0},
        flip: false,
        vel: {x: 20, y: 0},
        maxVel: {x: 50, y: 150},
        friction: {x: 0, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 220,
		checkAgainst: ig.Entity.TYPE.A,
	    type: ig.Entity.TYPE.B,
	    collides: ig.Entity.COLLIDES.PASSIVE,
	    name : 'player',
	    stand : 0,
	    
	    
        init: function (x, y, settings) {
        	this.parent( x, y, settings );
            this.addAnim('idle', 1, [10,11,12,13]);
            this.addAnim('run', .07, [4,5,6,7]);
            this.addAnim('jump', 1, [8]);
            this.addAnim('fall', 1, [9]);
            check=0;
            
        },

        update: function () {
            // move left or right
        	var accel = this.standing ? this.accelGround : this.accelAir;
        	
        	
        	if( ig.input.state('left') ) {
        		this.accel.x = -accel;
        		this.flip = true;
				
        	}else if( ig.input.state('right') ) {
        		this.accel.x = accel;
        		this.flip = false;
        	}else{
        		this.accel.x = 0;
        	}
        	// jump
        	if(!this.stand && ig.input.pressed('jump') &&check==0 ) {
        		this.vel.y = -this.jump;
        		this.stand=1;
        		console.log("1번점프");
        	}
        	
        	if (ig.input.released('jump')){
        		check= 1;
        	}
        	
        	if(this.stand==1 && ig.input.pressed('jump') && check==1){
        		this.vel.y = -this.jump;
        		check=0;
        		this.stand =2;
        		console.log("2번점프");
        	}
            // shoot
        	if( ig.input.pressed('shoot') ) { 	
        	    ig.game.spawnEntity( EntityBullet, this.pos.x, this.pos.y, {flip:this.flip} ); 	
        	}	


            // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
            	this.currentAnim = this.anims.jump;
            }else if( this.vel.y > 0 ) {
            	this.currentAnim = this.anims.fall;
            }else if( this.vel.x != 0 ) {
            	this.currentAnim = this.anims.run;
            }else{
            	this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
           // console.log("stand값"+this.stand);
        //   console.log("jump카운터값"+jumpCounter);
        	// move!
        	this.parent();
        },
		        check: function( other ) {
			if( other instanceof EntityBlock ){
				 this.stand=0;
				 check=0;
			}
        }
    });

   });


