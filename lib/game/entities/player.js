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
        animSheet: new ig.AnimationSheet( 'media/new_img/player.png', 62, 94 ),
        size: {x: 62, y:94},
        offset: {x: 2, y: 0},
        flip: false,
        vel: {x: 20, y: 0},
        maxVel: {x: 1000, y: 500},
		sound: new ig.Sound( 'media/itemEffect/sound/Jump.ogg' ),
		springSound: new ig.Sound( 'media/itemEffect/sound/spring.ogg' ),
		zIndex: 10,
        friction: {x: 0, y: 0},
        jump: 300,
		checkAgainst: ig.Entity.TYPE.A,
	    type: ig.Entity.TYPE.B,
	    collides: ig.Entity.COLLIDES.PASSIVE,
	    name : 'player',
	    stand : 0,
		_spring:0,
	    

        init: function (x, y, settings) {
        	this.parent( x, y, settings );
            this.addAnim('idle', .017, [0]);
            this.addAnim('run', .017, [0]);
            this.addAnim('jump', 017, [0]);
            this.addAnim('fall', 017, [0]);
            check=0;

            this.vel.x = 200;

            GM = new GameManager();
            count=0;

            
        },

        update: function () {

        	if (ig.input.released('right')){
        		this.vel.x= 150;
        	}
        	else if( ig.input.state('right') ) {
        		this.vel.x = (-GM.earthSpeed.x) + 100;
        	}
        	else{

        		this.accel.x = 0;

        	}
        	// jump
        	if(!this.stand && ig.input.pressed('jump') &&check==0 ) {
				this.sound.play();
        		this.vel.y = -this.jump;
        		this.stand=1;
        	}
        	
        	if (ig.input.released('jump')){
        		check= 1;
        	}
        	if(this.vel.y !=0 && !ig.input.state('right')){
        		this.vel.x = -50; 
        	}else if(this.vel.y !=0 && ig.input.state('right')){
        		this.vel.x = 50; 
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

            
            if(this.pos.x > ig.system.width/1.3 && this.vel.y!=0){
        		this.vel.x = -GM.earthSpeed.x - 50;
        	}
           

            	
        	this.parent();


        	},  
        	
        	
		    check: function( other ) {
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
				count++;
			}
			
        

    });

   });


