ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function () {

    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/real.png', 40, 30 ),
        size: {x: 30, y:20},
        offset: {x: 5, y: 5},
        flip: false,
        maxVel: {x: 100, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 220,
	 type: ig.Entity.TYPE.B,


        init: function (x, y, settings) {
        	this.parent( x, y, settings );
            this.addAnim('idle', 1, [10,11,12,13]);
            this.addAnim('run', .07, [4,5,6,7]);
            this.addAnim('jump', 1, [8]);
            this.addAnim('fall', 1, [9]);
            jumpCounter=0;
            
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
        	if( this.standing && ig.input.pressed('jump') ) {
        		this.vel.y = -this.jump;
        		jumpCounter=1;
        	}
        	if(!this.standing &&ig.input.pressed('jump')&&jumpCounter==1){

        		this.vel.y = -this.jump;
        		jumpCounter=0;
        	}
            // shoot

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

        	// move!
        	this.parent();

        }
    });
    
    EntityItem = ig.Entity.extend({
   	 size: {x: 6, y: 6},
       offset: {x:-1, y:-1},
   		 animSheet: new ig.AnimationSheet( 'media/item.png', 5, 5 ),  
   	 checkAgainst: ig.Entity.TYPE.B,
    //   collides: ig.Entity.COLLIDES.NONE,
   	
           init: function( x, y, settings ) {
               this.parent( x, y, settings );

               this.addAnim( 'idle', 1,[1]);
           },

   check: function(other){
   		
   			this.kill();
   			console.log("you eat item");
   		}
       });
   });


