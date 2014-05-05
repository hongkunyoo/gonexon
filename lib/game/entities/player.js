ig.module(
	'game.entities.player'
)
.requires(
	'impact.game',
	'impact.entity',
	'game.entities.item',
	'game.entities.weapon'
)
.defines(function () {
	EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/human.png', 40, 50 ),
        size: {x: 16, y:50},
        offset: {x: 16, y: 0},
        flip: false,
        vel: {x: 20, y: 0},
        maxVel: {x: 50, y: 150},
        friction: {x: 0, y: 0},
        jump: 220,
		checkAgainst: ig.Entity.TYPE.A,
	    type: ig.Entity.TYPE.B,
	    collides: ig.Entity.COLLIDES.ACTIVE,
	    name : 'player',
	    stand : 0,
	    
	    

        init: function (x, y, settings) {
        	this.parent( x, y, settings );
            this.addAnim('idle', .017, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
            this.addAnim('run', .017, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
            this.addAnim('jump', 017, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
            this.addAnim('fall', 017, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
            check=0;
            this.vel.x = 13;
            
        },

        update: function () {
            // move left or right
        	var accel = this.standing ? this.accelGround : this.accelAir;
        	
        	if( ig.input.state('right') ) {
        		this.vel.x = 35;
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
            
            if(this.pos.x < 15)
            	this.vel.x = 14;
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


