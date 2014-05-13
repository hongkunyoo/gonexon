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
        animSheet: new ig.AnimationSheet( 'media/human2.png', 63, 120 ),
        size: {x: 30, y:120},
        offset: {x: 16, y: 0},
        flip: false,
        vel: {x: 20, y: 0},
        maxVel: {x: 1000, y: 10000},
        friction: {x: 0, y: 0},
        jump: 300,
		checkAgainst: ig.Entity.TYPE.A,
	    type: ig.Entity.TYPE.B,
	    collides: ig.Entity.COLLIDES.PASSIVE,
	    name : 'player',
	    stand : 0,
	    
	    

        init: function (x, y, settings) {
        	this.parent( x, y, settings );
            this.addAnim('idle', .017, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
            this.addAnim('run', .017, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
            this.addAnim('jump', 017, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
            this.addAnim('fall', 017, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]);
            check=0;
            this.vel.x = 150;
            GM = new GameManager();
            
        },

        update: function () {
            // move left or right


        	
        	/*if(ig.input.state('left')){
        		this.vel.x = -90;
        	}
        	else*/ if (ig.input.released('right')){
        		console.log("release!!!!!!!");
        		this.vel.x= 150;
        	}
        	else if( ig.input.state('right') ) {
        		this.vel.x = (-GM.earthSpeed.x) + 50;
        	}
        	else{
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
        	if(this.vel.y !=0 && !ig.input.state('right')){
        		this.vel.x = -50; 
        	}else if(this.vel.y !=0 && ig.input.state('right')){
        		this.vel.x = 50; 
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
            
            if(this.pos.x > ig.system.width/1.3 && this.vel.y!=0){
        		this.vel.x = -GM.earthSpeed.x - 50;
        	}
            if(this.pos.x < 15 && !ig.input.pressed('right'))
            	this.vel.x = -GM.earthSpeed.x;
            if(this.vel.y > 200)
            	this.vel.y = 200;
            this.parent();
        	
        	},  // 이거 나중에 지워야함!! 뒤로 안밀려나게 하려고 한것임!!!
        	
		    check: function( other ) {
			if( other instanceof EntityEarth ){
				 this.stand=0;
				 check=0;
			}    //점프 하고 땅에 닿아야 초기화 되로록 한 것임!!!
        }
    });

   });


