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
        animSheet: new ig.AnimationSheet( 'media/new/character/player.png', 62, 94 ),
        size: {x: 62, y:94},
        //offset: {x: 2, y: 0},

        //vel: {x: 20, y: 0},
        maxVel: {x: 1000, y: 10000},

		//sound: new ig.Sound( 'media/itemEffect/sound/Jump.ogg' ),
		//springSound: new ig.Sound( 'media/itemEffect/sound/spring.ogg' ),
		//zIndex: 10,
  
		//playerTime : new ig.Timer(2),

		checkAgainst: ig.Entity.TYPE.B,
	    type: ig.Entity.TYPE.A,
	    collides: ig.Entity.COLLIDES.PASSIVE,
	    name : 'player',

	    //stand : true,
		//_spring:0,
		STATE : 0,
	    
		WALK_SPEED: 100,
		DASH_SPEED: 600,
		JUMP_SPEED: -500,

        init: function (x, y, settings) {

        	this.parent( x, y, settings );

            this.addAnim('walk', .13, [0,1,2,3,4,5,6]);
			this.addAnim('attacked', .017, [7,8,9,10,11,12,13]);
			this.addAnim('dash', .04, [14,15,16,17,18,19,20]);
			this.addAnim('jump', .1, [21,22,23,24,25,26,27]);
			this.addAnim('jump2', .017, [28,29,30,31,32,33,34]);
			
			this.currentAnim = this.anims.walk;

            this.vel.x = this.WALK_SPEED;
        },

        update: function () {
			this.parent();
			
			if (this.stand)
			{
				//this.currentAnim = this.anims.walk;
			}
			/*
			// press dash
			if (ig.input.pressed('dash'))
			{
				this.vel.x = this.DASH_SPEED;
				this.currentAnim = this.anims.dash;
				_this = this;
				setTimeout(function(){
					_this.currentAnim = _this.anims.walk;
					_this.vel.x = _this.WALK_SPEED;
				}, 500, _this);
			}
			*/
			
			/*
        	if (ig.input.released('right')){
        		this.vel.x= 150;
        	}
        	else if( ig.input.state('right')&& this.vel.y == 0 ) {
        		this.accel.x = 300;
        	}
        	else{
        		this.accel.x = 0;
        	}

			if(this.vel.x >(-GM.earthSpeed.x + 100))
				this.vel.x = -GM.earthSpeed.x + 100;
        	// jump
        	if(!this.stand && ig.input.pressed('jump') &&check==0 ) {
				this.sound.play();
        		this.vel.y = -this.jump;
        		this.stand=1;
        	}
        	
        	if (ig.input.released('jump')){
				this.vel.x -= GM.earthSpeed.x;
        		check= 1;
        	}
        	
        	if(this.stand==1 && ig.input.pressed('jump') && check==1){
				this.sound.play();
        		this.vel.y = -this.jump;
        		check=0;
        		this.stand =2;
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

        	this.parent();
			*/

        }
        
        /*,  
        	
        
		check: function( other ) {
			//if( other instanceof EntityEarth || other instanceof EntityBlock ){
			//	this.stand = true;
			//}
			
			if( other instanceof EntityEarth || other instanceof EntityBlock ){
				this.stand=0;
				check=0;
				this._spring=0;
				GM.earthSpeed.x = -200;
				GM.blockSpeed.x = -200;
				GM.itemSpeed = -200;
				
			}    //점프 하고 땅에 닿아야 초기화 되로록 한 것임!!!
			
			if( other instanceof EntitySpring && this._spring==0){
				this.springSound.play();

				this.vel.y = -300;
				other.sp = 1;
				other.collides = ig.Entity.COLLIDES.NONE;
				this._spring = 1;

				GM.earthSpeed.x = -1000;
				GM.blockSpeed.x = -1000;
				GM.itemSpeed = -1000;
	        	
			}
			
		}
		*/
    });

	EntityPlayer.STATE = {
		WALK : 0,
		ATTACKED : 1,
		DASH : 2,
		JUMP : 3,
		JUMP2 : 4,
		SHOOT : 5
	}
});


