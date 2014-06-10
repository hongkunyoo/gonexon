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
		size : {x : 30, y: 15},
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
				IM.canPut = 0;
			}
			this.kill();
		},

		
	});

	ItemManager = ig.Class.extend({

        timer: null,
		starTimer: new ig.Timer(0.09),
		setStarTimer: new ig.Timer(1.2),
		onblocky: 0,
		canPut: 1,
		
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
                 	
        	//A학점 F학점 아이템 입니다.
        	case 6 : 
        		for( i = 1; i < 12; i++){
       	 			if(i < 7){
       	 				if ( i == 3 ){
       	 					for ( j = 0; j < 3 ; j ++ ) 
       	 						aplus = ig.game.spawnEntity(EntityA, ig.system.width + 14*i + 28*5 + 28*j , ig.system.height/2-28*i);      	 					      	 				    
       	 				}
       	 				else
       	 					aplus = ig.game.spawnEntity(EntityA, ig.system.width+14*i+28*5, ig.system.height/2-28*i);
       	 			}
       	 			else
       	 				aplus = ig.game.spawnEntity(EntityA, ig.system.width+14*i+28*5, ig.system.height/2-28*6+28*(i-6));
       	 			
       	 		}
    			break;
    			
        	case 7 :
        		for( i = 1 ; i < 6 ; i ++){
        			
        			f = ig.game.spawnEntity(EntityF, ig.system.width + 28 , ig.system.heigth/2 - 28*i );
        			
        			if( i == 3 ) {
        				for ( j = 1 ; j < 5 ; j ++ )
        					f = ig.game.spawnEntity(EntityF, ig.system.width + 28 * j , ig.system.height/2 - 28*i );
        			}
        			if( i == 5 ){
        				for ( j = 1 ; j < 5 ; j ++ )
        					f = ig.game.spawnEntity(EntityF, ig.system.width + 28 * j , ig.system.height/2 - 28*i );
        			}        			
        					
        		}
        		break;
        	}
             		
        },
        
        update: function () {

			if(this.starTimer.delta()>0){
				this.starTimer.reset();
				starManager = ig.game.spawnEntity(EntitystarManager, ig.system.width+3, 0);
			}
			if(this.setStarTimer.delta()>0){
				this.setStarTimer.reset();
				check1 = ig.game.spawnEntity(EntitystarManager, ig.system.width, 0);
				check2 = ig.game.spawnEntity(EntitystarManager, ig.system.width+12*28, 0);
				check3 = ig.game.spawnEntity(EntitystarManager, ig.system.width+6*28, 0);
				if(this.canPut ==1)  //이거 떠다니는 블록이랑 안겹치게 하려고 하다가 삼천포로 빠져서 뭐 하고 뭐하다가 이상하게 됐어요......ㅠㅠㅠㅠㅠ
					this.itemArrange( Math.floor((Math.random() * 1000) % 8));
				
			}
			
        },
    });
    
    ItemManager.TYPE = {
        HEART: 0,
        STAR: 1,
        JUMP: 2,
        SUPER_JUMP: 3
    };

});
