ig.module(
	'game.entities.player'
)
.requires(
	'impact.game',
	'impact.entity',
	'game.entities.item'
)
.defines(function () {
	
	EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/new/character/player.png', 62, 94 ),
        size: {x: 62, y:65},
        offset: {x: 0, y: 29},

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

	    stand : true,
	    dash: false,
	    
	    didJump2: false,
	    
	    //spinJumpSound: new ig.Sound('media/sound/spin_jump.mp3'),
	    spinJumpSound: new ig.Sound('media/sound/ogg/spin_jump.ogg'),
		jumpSound : new ig.Sound('media/sound/ogg/Jump.ogg'),
	    
        init: function (x, y, settings) {

        	this.parent( x, y, settings );

            this.addAnim('walk', .13, [0,1,2,3,4,5,6]);
			this.addAnim('attacked', .1, [7,8,9,10,11,12,13]);
			this.addAnim('dash', .05, [14,15,16,17,18,19,20]);
			this.addAnim('jump', .1, [21,22,23,24,25,26,27]);
			this.addAnim('jump2', .03, [28,29,30,31,32,33,34]);
			
			this.currentAnim = this.anims.walk;

            this.vel.x = GM.WALK_SPEED;
        },

        update: function () {
			this.parent();
        },
        
        check: function (other) {
        	if ((other instanceof EntityEarth || other instanceof EntityBlock) && this.stand == false) {
        		if (!this.isDownTouch(other)) {
        			this.currentAnim = this.anims.walk;
            		this.vel.x = GM.WALK_SPEED;
            		this.stand = true;
            		this.didJump2 = false;
        		}
        	}
        },
        
        isDownTouch: function (other) {
        	if (this.pos.y + this.size.y <= other.pos.y) return true;
        	return false;
        },
        
        damage: function () {
        	GM.decreaseHeart();
        	this.currentAnim = this.anims.attacked;
        }
    });

	EntityPlayer.STATE = {
		WALK : 0,
		ATTACKED : 1,
		DASH : 2,
		JUMP : 3,
		JUMP2 : 4,
		SHOOT : 5
	};
});


