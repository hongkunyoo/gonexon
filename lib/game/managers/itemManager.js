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

		animSheet: new ig.AnimationSheet('media/new_img/star.png', 20, 20 ),
		gravityFactor: 0,
		timer1: new ig.Timer(1.2),
		timer2: new ig.Timer(1.2),
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		size : {x : 15, y: 15},
		maxVel: {x:100, y: 1000},
		state: 1,
		isFlyBlock: 0,
		
		init: function (x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.vel.y = 450;
			IM = new ItemManager();
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
			if( this.pos.y< ig.system.height/2){
					console.log("0");
				if(this.pos.x<ig.system.width+20){
					IM.canPutFront = 0;
					console.log("1");
				}
				else if(this.pos.x > ig.system.width + 200){
					IM.canPutMiddle=0;
					console.log("2");
				}
				else
					IM.canPutBack=0;
			}
			else{
				if(this.pos.x<ig.system.width+2){
					IM.canPutFront = 1;
				}
				else if(this.pos.x > ig.system.width + 200){
					IM.canPutMiddle=1;
				}
				else
					IM.canPutBack=1;
			}

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
			canPutFront= 1;
			canPutBack= 1;
			canPutMiddle=1;
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
        			
        	//case 1 부터 3 까지 stage1 아이템 배열 입니다.
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
           		 	
           	//case 4 에서 5 까지는 stage3 (cc 되기) 단계 아이템 배열입니다.
           	 case 4:
           		 	for(i = 1; i < 12; i++){
           		 		if ( (i % 2) != 0 ){
           		 			heartbreak = ig.game.spawnEntity(EntityBreak, ig.system.width + 28*i, ig.system.height/4 + 28);
           		 			heartbreak = ig.game.spawnEntity(EntityBreak, ig.system.width + 28*i, ig.system.height/4 );
           		 		}
           		 		else {
           		 			heartbreak = ig.game.spawnEntity(EntityBreak, ig.system.width + 28*i, ig.system.height/4 + 56);
           		 			heartbreak = ig.game.spawnEntity(EntityBreak, ig.system.width + 28*i, ig.system.height/4 + 28);
           		 		}
           		 	}	
           		 	break;
           		 	
           	 case 5:
           		 	for(i = 1; i < 8; i++){
           		 		if ( i == 1 || i == 7 ){
           		 			heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 - 28);
           		 			heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 );
           		 		}
           		 		if( i == 2 || i == 6 ) {
           		 			heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 - 28 * 2);
           		 			heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 + 28 );
           		 		}
           		 		if( i == 3 || i == 5 ){
           		 			heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 - 28 );
           		 			heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 + 28 * 2 );
           		 		}
           		 		if ( i == 4 ){
           		 			heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 );
           		 			heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 + 28 * 3 );
           		 		}
           		 	}
           		 		break;
                 	
        	//
        	case 6 : 
        		for( i = 1; i < 8; i++){
       	 			if(i<5){
       	 				if ( i == 2 ){
       	 					for ( j = 2 ; j < 7 ; j ++ ) 
       	 						star = ig.game.spawnEntity(EntityStar, ig.system.width+28*j + 28*5, ig.system.height/2-28*i);      	 					      	 				    
       	 				}
       	 				else
       	 					star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i+28*5, ig.system.height/2-28*i);
       	 			}
       	 			else
       	 				star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i+28*5, ig.system.height/2-28*4+28*(i-4));
       	 		}
    			break;
        	}
             		
        },
        
        update: function () {
			
			//checky = ig.game.spawnEntity(EntitystarManager, ig.game.width, 0);
        	//if( checky.onBlocky <= ig.system.height/2 && checky.onBlocky >= ig.system.height/2 -28 *5)
		       	
			if(this.starTimer.delta()>0){
				this.starTimer.reset();
				starManager = ig.game.spawnEntity(EntitystarManager, ig.system.width+3, 0);
			}
			if(this.setStarTimer.delta()>0){
				this.setStarTimer.reset();
				check1 = ig.game.spawnEntity(EntitystarManager, ig.system.width, 0);
				check2 = ig.game.spawnEntity(EntitystarManager, ig.system.width+12*28, 0);
				check3 = ig.game.spawnEntity(EntitystarManager, ig.system.width+6*28, 0);
				if(canPutFront ==0 || canPutBack == 0 || canPutMiddle == 0)
					console.log("wef");
				if(canPutFront ==1 && canPutBack == 1 && canPutMiddle == 1)
					this.itemArrange( Math.floor((Math.random() * 1000) % 7));
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
