ig.module(
	'game.managers.itemManager'
)
.requires(
	'game.entities.item'
)
.defines(function () {
//////////////////////////////////////////////////////////////
    //
    // 게임에서 필요한 아이템 관련 사항 생성 및 관리
    //
    //////////////////////////////////////////////////////////////
////////////////////

	EntitystarManager = ig.Entity.extend({

		animSheet: new ig.AnimationSheet('media/new_img/heart-01.png', 20, 20 ),
		gravityFactor: 0,
		timer1: new ig.Timer(1.2),
		timer2: new ig.Timer(1.2),
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		size : {x : 15, y: 15},
		maxVel: {x:100, y: 1000},
		state: 1,
		onBlocky: 0,
		
		init: function (x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.vel.y = 450;
		},
		
		update: function(){
			this.parent();	
			if(this.timer1.delta()>2){
				monster = ig.game.spawnEntity(EntityMonster, starManager.pos.x,300);
				this.timer1.reset();
				}
			if(this.timer2.delta()>3){
				spring = ig.game.spawnEntity(EntitySpring, starManager.pos.x,300);
				this.timer2.reset();
				}
		},
		
		check: function (other) {
			onBlocky = this.pos.y;
			this.kill();
		},  //star을 놓는 함수!!

		
	});

	ItemManager = ig.Class.extend({

        timer: null,
		starTimer: new ig.Timer(0.09),
		setStarTimer: new ig.Timer(1.2),
		onblocky: 0,
		
        pool: {
            "item0": [],
            "item1": [],
            "item2": [],
            "item3": []
        },

        staticInstantiate: function () {
            if (ItemManager.instance == null) {
                return null;
            }
            else {
                return ItemManager.instance;
            }
        },

        init: function () {

        },
        
        myInit: function(){
        	this.timer = new ig.Timer(GM.itemSpeed);
        	starManager = ig.game.spawnEntity(EntitystarManager, ig.system.width-7, 0);
			this.pool[0] = this.generate(ItemManager.TYPE.STAR);
        },
        
        generate: function (TYPE, x, y, _settings) {
            
            switch (TYPE) {
           	 case ItemManager.TYPE.STAR:
                    return ig.game.spawnEntity(EntityStar, ig.system.width, starManager.onBlocky);
            }
        },

        itemArrange: function(num){
        	switch (num) {
        	 case 0:
        			break;
           	 case 1:
           	 		for(i = 1; i < 8; i++){
           	 			if(i<6)
           	 				star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i, ig.system.height/2);
           	 			if(i<5)
           	 				star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i+28*5, ig.system.height/2-28*i);
           	 			else
           	 				star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i+28*5, ig.system.height/2-28*4+28*(i-4));
           	 		}
        			break;
           	 case 2:
           	 		for(i = 1; i < 6; i++){
						bob = ig.game.spawnEntity(EntityRice, ig.system.width+56, ig.system.height/2-28*i);
           	 			star = ig.game.spawnEntity(EntityStar, ig.system.width, ig.system.height/2-28*i);
           	 			star = ig.game.spawnEntity(EntityStar, ig.system.width + 28, ig.system.height/2-28*i);
           	 		}
        			break;
           	 case 3: 
           		 	for(i = 1; i < 8; i++){
           		 		star = ig.game.spawnEntity(EntityStar, ig.system.width + 28*i, ig.system.height/4 + 28);
           		 		star = ig.game.spawnEntity(EntityStar, ig.system.width + 28*i, ig.system.height/4 );
           		 	}
           		 	break;
           	}           
             		
        },
        
        update: function () {
        	/*
        	 * 빵보 ,
        	if( this.onBlocky <= ig.system.height/2 && this.onBlocky >= ig.system.height/2 -28 *5)
			{
        		console.log("뭔가 이건");
        		this.starTimer.reset();
        		this.setStarTimer.reset();
        		this.itemArrange( 0 );
        		
			} */
        	
        	//console.log(this.onBlocky); 문제는 onBlocky를 인식하지 않는 것 같다
			if(this.starTimer.delta()>0){
				this.starTimer.reset();
				starManager = ig.game.spawnEntity(EntitystarManager, ig.system.width+3, 0);
			}
			if(this.setStarTimer.delta()>0){
				this.setStarTimer.reset();
				this.itemArrange( Math.floor((Math.random() * 1000) % 4));
			}
			
        },

        _blockSelector: function () {
            

        },

        _choosePos: function (axis, blockType) {
        
        },

        getFromPool: function (type, x, y) {
        
        },

        returnToPool: function (item) {
            
        },
    });
    
    ItemManager.TYPE = {
        HEART: 0,
        STAR: 1,
        JUMP: 2,
        SUPER_JUMP: 3
    };

});
