ig.module(
	'game.managers.itemManager'
)
.requires(
	'game.entities.item',
	'game.entities.spring',
	'game.entities.can',
	'game.entities.monster'
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
			//this.vel.y = 450;
			//IM = new ItemManager();
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

        staticInstantiate: function () {
            if (ItemManager.instance == null) {
                return null;
            }
            else {
                return ItemManager.instance;
            }
        },

        init: function () {
        	ItemManager.instance = this;
        },
        
        myInit: function(){
        	this.timer = new ig.Timer(GM.itemSpeed);
        },
        
        generate: function (TYPE, x, y, _settings) {
            
            switch (TYPE) {
            case ItemManager.TYPE.HEART:
            	return ig.game.spawnEntity(EntityItem, x, y, {
            		itemType : TYPE,
            		name : 'heart',
            		animSheet : new ig.AnimationSheet('media/new/item/heart.png',28,28),	                  
            		size: { x: 27, y: 27 },
            		
            		_init: function () {
            			
            			this.addAnim('idle', 0.2, [0,1,2,3,4]);
            			this.vel.x = GM.itemSpeed;
            		},
            		check: function(other){
            			if(other.name == 'player'){
            				GM.addHeart();
            				//GM.shakeScreen();
            				IM.generate(ItemManager.TYPE.HEART_BREAK, this.pos.x, this.pos.y);
            				
            				this.kill();
            			}
            		},
            	});
           	case ItemManager.TYPE.STAR:
                return ig.game.spawnEntity(EntityItem, x, y, {
                	itemType : TYPE,
            		name : 'star',
            		animSheet : new ig.AnimationSheet('media/new/item/star.png',28,28),	                  
            		size: { x: 27, y: 27 },
            		
            		sound: new ig.Sound( 'media/itemEffect/sound/Coin.ogg' ),

            		_init: function () {
            			this.addAnim('idle', 0.2, [0,1,2,3,4]);
            			
            			this.vel.x = GM.itemSpeed;
            		},
            		check: function(other){
            			if(other.name == 'player'){
            				this.sound.play();
            				GM.addStar();
            				//GM.shakeScreen();
            				//ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
            				this.kill();
            			}
            		}
                });
           	case ItemManager.TYPE.COIN:
                return ig.game.spawnEntity(EntityItem, x, y, {
                	itemType : TYPE,
            		name : 'coin',
            		animSheet : new ig.AnimationSheet('media/new/item/coin.png',28,28),	                  
            		size: { x: 27, y: 27 },

            		_init: function () {
            			this.addAnim('idle', 0.2, [0]);
            			this.vel.x = GM.itemSpeed;
            		},
            		check: function(other){
            			if(other.name == 'player'){
            				GM.addCoin();
            				//GM.shakeScreen();
            				this.kill();
            			}
            		}
                });
           	case ItemManager.TYPE.A_SCORE:
                return ig.game.spawnEntity(EntityItem, x, y, {
                	itemType : TYPE,
            		name : 'score_a',
            		animSheet : new ig.AnimationSheet('media/new_img/A-01.png',28,28),	                  
            		size: { x: 27, y: 27 },

            		_init: function () {
            			this.addAnim('idle', 0.05, [0]);
            			this.vel.x = GM.itemSpeed;
            		},
            		check: function(other){
            			if(other.name == 'player'){
            				//GM.addCoin();
            				//GM.shakeScreen();
            				//ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
            				this.kill();
            			}
            		}
                });
           	case ItemManager.TYPE.F_SCORE:
                return ig.game.spawnEntity(EntityItem, x, y, {
                	itemType : TYPE,
            		name : 'score_f',
            		animSheet : new ig.AnimationSheet('media/new_img/f-01.png',28,28),	                  
            		size: { x: 27, y: 27 },

            		_init: function () {
            			this.addAnim('idle', 0.05, [0]);
            			this.vel.x = GM.itemSpeed;
            		},
            		check: function(other){
            			if(other.name == 'player'){
            				//GM.addCoin();
            				//GM.shakeScreen();
            				//ig.game.spawnEntity(EntityEatHeart, this.pos.x, this.pos.y); 
            				this.kill();
            			}
            		}
                	
                });
           	case ItemManager.TYPE.SPRING:
                return ig.game.spawnEntity(EntitySpring, x, y);
           	case ItemManager.TYPE.CAN:
                return ig.game.spawnEntity(EntityCan, x, y);
           	case ItemManager.TYPE.MONSTER01:
                return ig.game.spawnEntity(EntityMonster01, x, y);
           	case ItemManager.TYPE.MONSTER02:
                return ig.game.spawnEntity(EntityMonster02, x, y);
           	case ItemManager.TYPE.HEART_BREAK:
           		return ig.game.spawnEntity(EntityItem,x, y, {
           			itemType : TYPE,
					name : 'heartbreak',
					animSheet : new ig.AnimationSheet('media/new_img/heartbreak-01.png',28,28),	                  
					size: { x: 27, y: 27 },
					collides: ig.Entity.COLLIDES.NEVER,
			
					_init: function () {
						this.addAnim('idle', 1, [0]);
						this.currentAnim = this.anims.idle;
						this.vel.x = GM.itemSpeed;
					},
					_update: function () {
						this.currentAnim.alpha -= 0.1;
						
						if (this.currentAnim.alpha < 0.1) this.kill();
					}
           		});
            }
        },
        
        fetchAndMakeItem: function (arr) {
        	for (var i = 0 ; i < arr.length ; i++) {
        		//this.tail = this.getFromPool(arr[i].type, this.tail.pos.x + this.tail.size.x + arr[i].x + 0.05, this.tail.pos.y + arr[i].y);
        	}
        },
        
        fetchAndMakeMonster: function (arr) {
        	for (var i = 0 ; i < arr.length ; i++) {
        		//this.tail = this.getFromPool(arr[i].type, this.tail.pos.x + this.tail.size.x + arr[i].x + 0.05, this.tail.pos.y + arr[i].y);
        	}
        },

        itemArrange: function(num){
        	switch (num) {
        	 case 0:
        			break;
        			
        	//case 1 부터 3 까지 stage1 아이템 배열 입니다.
           	 case 1:
           	 		for(var i = 1; i < 8; i++){
           	 			if(i<6)
           	 				star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i, ig.system.height/2);
           	 			if(i<5)
           	 				star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i+28*5, ig.system.height/2-28*i);
           	 			else
           	 				star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i+28*5, ig.system.height/2-28*4+28*(i-4));
           	 		}
        			break;
           	 case 2:
           	 		for(var i = 1; i < 6; i++){
						bob = ig.game.spawnEntity(EntityRice, ig.system.width+56, ig.system.height/2-28*i);
           	 			star = ig.game.spawnEntity(EntityStar, ig.system.width, ig.system.height/2-28*i);
           	 			star = ig.game.spawnEntity(EntityStar, ig.system.width + 28, ig.system.height/2-28*i);
           	 		}
        			break;
           	 case 3: 
           		 	for(var i = 1; i < 8; i++){
           		 		star = ig.game.spawnEntity(EntityStar, ig.system.width + 28*i, ig.system.height/4 + 28);
           		 		star = ig.game.spawnEntity(EntityStar, ig.system.width + 28*i, ig.system.height/4 );
           		 	}
           		 	break;
           		 	
           	//case 4 에서 5 까지는 stage3 (cc 되기) 단계 아이템 배열입니다.
           	 case 4:
           		 	for(var i = 1; i < 12; i++){
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
           		 	for(var i = 1; i < 8; i++){
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
        		for(var i = 1; i < 12; i++){
       	 			if(i < 7){
       	 				if ( i == 3 ){
       	 					for (var j = 0; j < 3 ; j ++ ) 
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
        		for(var i = 1 ; i < 6 ; i ++){
        			
        			f = ig.game.spawnEntity(EntityF, ig.system.width + 28 , ig.system.heigth/2 - 28*i );
        			
        			if( i == 3 ) {
        				for (var j = 1 ; j < 5 ; j ++ )
        					f = ig.game.spawnEntity(EntityF, ig.system.width + 28 * j , ig.system.height/2 - 28*i );
        			}
        			if( i == 5 ){
        				for (var j = 1 ; j < 5 ; j ++ )
        					f = ig.game.spawnEntity(EntityF, ig.system.width + 28 * j , ig.system.height/2 - 28*i );
        			}        			
        					
        		}
        		break;
        	}
             		
        },
        
        update: function () {

//			if(this.starTimer.delta()>0){
//				this.starTimer.reset();
//				starManager = ig.game.spawnEntity(EntitystarManager, ig.system.width+3, 0);
//			}
//			if(this.setStarTimer.delta()>0){
//				this.setStarTimer.reset();
//				check1 = ig.game.spawnEntity(EntitystarManager, ig.system.width, 0);
//				check2 = ig.game.spawnEntity(EntitystarManager, ig.system.width+12*28, 0);
//				check3 = ig.game.spawnEntity(EntitystarManager, ig.system.width+6*28, 0);
//				if(this.canPut ==1)  //이거 떠다니는 블록이랑 안겹치게 하려고 하다가 삼천포로 빠져서 뭐 하고 뭐하다가 이상하게 됐어요......ㅠㅠㅠㅠㅠ
//					this.itemArrange( Math.floor((Math.random() * 1000) % 8));
//				
//			}
			
        },
    });
    
    ItemManager.TYPE = {
        HEART: 0,
        STAR: 1,
        COIN : 2,
        A_SCORE: 3,
        F_SCORE: 4,
        SPRING: 5,
        CAN: 6,
        MONSTER01: 7,
        MONSTER02: 8,
        HEART_BREAK: 9
    };

});
