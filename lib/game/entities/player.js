ig.module(
	'game.entities.player'
)
.requires(
	'impact.game',
	'impact.entity',
	'game.entities.item'
)
.defines(function () {
	EntityBlock = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/block.png', 52, 15 ),
		gravityFactor: 0,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.FIXED,
		size : {x : 50, y:15},
		maxVel : {x: 50, y: 50},
		init: function (x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.vel.x = -13;
			
			//timer.set(2);
			//this.accel.y = -300;
		},
		update: function(){
		this.parent();	
		
			
		},
		check: function (other) {

        },

	});


    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/real.png', 40, 30 ),
        size: {x: 20, y:20},
        offset: {x: 5, y: 5},
        flip: false,
        maxVel: {x: 100, y: 150},
        friction: {x:0, y: 0},
        jump: 220,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.B,
		name: 'chu',


        init: function (x, y, settings) {
        	this.parent( x, y, settings );
            this.addAnim('idle', 1, [10,11,12,13]);
            this.addAnim('run', .07, [4,5,6,7]);
            this.addAnim('jump', 1, [8]);
            this.addAnim('fall', 1, [9]);
            jumpCounter=0;
            this.vel.x = 17;
            
        },

        update: function () {
            // move left or right
        	var accel = this.standing ? this.accelGround : this.accelAir;

        	if( ig.input.state('left') ) {
        		this.vel.x = -this.vel.x;
        		this.flip = true;
				
        	}else if( ig.input.state('right') ) {
        		this.vel.x = -this.vel.x;
        		this.flip = false;
        	}else{
        		this.accel.x = 0;
        	}
        	// jump
        	if( /*this.standing &&*/ ig.input.pressed('jump') ) {
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

        },
		check: function( other ) {/*
			if(other.pickup !=null){
				other.pickup();*/
		//	}
        }
    });
    
   });


