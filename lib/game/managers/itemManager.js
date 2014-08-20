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

	ItemManager = ig.Class.extend({

//        timer: null,
//		starTimer: new ig.Timer(0.09),
//		setStarTimer: new ig.Timer(1.2),
//		onblocky: 0,
//		canPut: 1,

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
        	//this.timer = new ig.Timer(GM.itemSpeed);
        	
        	var items = ig.game.getEntitiesByType( EntityItem );
        	for (var i = 0 ; i < items.length ; i++) {
        		items[i].kill();
        	}
        	
        	var mon = ig.game.getEntitiesByType( EntityMonster01 );
        	for (var i = 0 ; i < mon.length ; i++) {
        		mon[i].kill();
        	}
        	
        	mon = ig.game.getEntitiesByType( EntityMonster02 );
        	for (var i = 0 ; i < mon.length ; i++) {
        		mon[i].kill();
        	}
        	
        	can = ig.game.getEntitiesByType( EntityCan );
        	for (var i = 0 ; i < can.length ; i++) {
        		can[i].kill();
        	}
        	
        	spring = ig.game.getEntitiesByType( EntitySpring );
        	for (var i = 0 ; i < spring.length ; i++) {
        		spring[i].kill();
        	}
        },
        
        fetchAndMakeItem: function (arr) {
        	for (var i = 0 ; i < arr.length ; i++) {
        		if (ItemManager.ARRANGE_TYPE[arr[i].type] != undefined) {
        			this.itemArrange(ItemManager.ARRANGE_TYPE[arr[i].type], arr[i].x, arr[i].y);
        		} else {
        			this.generate(ItemManager.TYPE[arr[i].type], arr[i].x, arr[i].y);
        		}
        	}
        },
        
        fetchAndMakeMonster: function (arr) {
        	for (var i = 0 ; i < arr.length ; i++) {
        		this.generate(ItemManager.TYPE[arr[i].type], arr[i].x, arr[i].y);
        	}
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
            				//IM.generate(ItemManager.TYPE.HEART_BREAK, this.pos.x, this.pos.y);
            				
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
            				IM.generate(ItemManager.TYPE.TWINKLE, this.pos.x,this.pos.y);
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
            				IM.generate(ItemManager.TYPE.TWINKLE, this.pos.x,this.pos.y);
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
           	case ItemManager.TYPE.CAN_ITEM:
           		return ig.game.spawnEntity(EntityCanItem,x, y);
           	case ItemManager.TYPE.TWINKLE:
           		return ig.game.spawnEntity(EntityItem,x, y, {
           			itemType : TYPE,
					name : 'canitem',
					animSheet : new ig.AnimationSheet('media/new/item/twinkle.png',35,35),	                  
					size: { x: 35, y: 35 },
					collides: ig.Entity.COLLIDES.NEVER,
					timer: new ig.Timer(0.5),
					
					
					_init: function () {
						this.addAnim('idle', 0.05, [0,1,2,3,4,5,6,7]);
						this.vel.x = GM.itemSpeed;
						this.vel.y = -100;
					},
					_update: function () {
						//this.currentAnim.alpha -= 0.01;
						
						//if (this.currentAnim.alpha < 0.1) this.kill();
						if (this.timer.delta() > 0) this.kill();
					}
           		});
            }
        },
        
        itemArrange: function (arrange_type, x, y) {
        	switch (arrange_type) {
        	 case 0:
        			break;
        			
        	//case 1 부터 3 까지 stage1 아이템 배열 입니다.
        	// Jump Guide Line
           	 case 1:
           	 		for(var i = 1; i < 8; i++){
           	 			if(i < 6)
           	 				this.generate(ItemManager.TYPE.STAR, x + 28*i, y);
           	 				//star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i, ig.system.height/2);
           	 			if(i < 5)
           	 				this.generate(ItemManager.TYPE.STAR, x + 28*i + 28*5, y - 28*i);
           	 				//star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i+28*5, ig.system.height/2-28*i);
           	 			else
           	 				this.generate(ItemManager.TYPE.STAR, x + 28*i + 28*5, y - 28*4 + 28*(i-4));
           	 				//star = ig.game.spawnEntity(EntityStar, ig.system.width+28*i+28*5, ig.system.height/2-28*4+28*(i-4));
           	 		}
        			break;
        	 // 3 X 5 Square Pattern
           	 case 2:
           	 		for(var i = 1; i < 6; i++){
           	 			this.generate(ItemManager.TYPE.COIN, x + 56, y - 28*i);
						//bob = ig.game.spawnEntity(EntityRice, ig.system.width+56, ig.system.height/2-28*i);
           	 			this.generate(ItemManager.TYPE.STAR, x, y - 28*i);
           	 			//star = ig.game.spawnEntity(EntityStar, ig.system.width, ig.system.height/2-28*i);
           	 			this.generate(ItemManager.TYPE.STAR, x + 28, y - 28*i);
           	 			//star = ig.game.spawnEntity(EntityStar, ig.system.width + 28, ig.system.height/2-28*i);
           	 		}
        			break;
        	 // 7 X 2 row Square Pattern
           	 case 3: 
           		 	for(var i = 1; i < 8; i++){
           		 		this.generate(ItemManager.TYPE.STAR, x + 28*i, y + 28);
           		 		//star = ig.game.spawnEntity(EntityStar, ig.system.width + 28*i, ig.system.height/4 + 28);
           		 		this.generate(ItemManager.TYPE.STAR, x + 28*i, y);
           		 		//star = ig.game.spawnEntity(EntityStar, ig.system.width + 28*i, ig.system.height/4 );
           		 	}
           		 	break;
           		 	
           	//case 4 에서 5 까지는 stage3 (cc 되기) 단계 아이템 배열입니다.
            // Need to be modified
           	 case 4:
           		 	for(var i = 1; i < 12; i++){
           		 		if ( (i % 2) != 0 ){
           		 			this.generate(ItemManager.TYPE.HEART, x + 28*i, y + 28);
           		 			//heartbreak = ig.game.spawnEntity(EntityBreak, ig.system.width + 28*i, ig.system.height/4 + 28);
           		 			this.generate(ItemManager.TYPE.HEART, x + 28*i, y);
           		 			//heartbreak = ig.game.spawnEntity(EntityBreak, ig.system.width + 28*i, ig.system.height/4 );
           		 		}
           		 		else {
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y/4 + 56);
           		 			//heartbreak = ig.game.spawnEntity(EntityBreak, ig.system.width + 28*i, ig.system.height/4 + 56);
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y/4 + 28);
           		 			//heartbreak = ig.game.spawnEntity(EntityBreak, ig.system.width + 28*i, ig.system.height/4 + 28);
           		 		}
           		 	}	
           		 	break;
           	// Heart Pattern	 	
           	 case 5:
           		 	for(var i = 1; i < 8; i++){
						
           		 		if ( i == 1 || i == 7 ){
           		 			this.generate(ItemManager.TYPE.HEART, x + 28*i, y - 28);
           		 			//heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 - 28);
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y);
           		 			//heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 );
           		 		}
           		 		if( i == 2 || i == 6 ) {
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y - 28*2);
           		 			//heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 - 28 * 2);
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y + 28);
           		 			//heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 + 28 );
           		 		}
           		 		if( i == 3 || i == 5 ){
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y - 28);
           		 			//heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 - 28 );
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y + 28*2);
           		 			//heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 + 28 * 2 );
           		 		}
           		 		if ( i == 4 ){
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y);
           		 			//heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 );
           		 			this.generate(ItemManager.TYPE.STAR, x + 28*i, y + 28*3);
           		 			//heart = ig.game.spawnEntity(EntityHeart, ig.system.width + 28*i, ig.system.height/4 + 28 * 3 );
           		 		}
           		 	}
           		 		break;
                 	
        	//A학점 F학점 아이템 입니다.
            // A Pattern
        	case 6 : 
        		console.log('in here 6');
        		for(var i = 1; i < 12; i++){
       	 			if(i < 7){
       	 				if ( i == 3 ){
       	 					for (var j = 0; j < 3 ; j ++ ) 
       	 						this.generate(ItemManager.TYPE.A_SCORE, x + 14*i + 28*5 + 28*j, y - 28*i);
       	 					//aplus = ig.game.spawnEntity(EntityA, ig.system.width + 14*i + 28*5 + 28*j , ig.system.height/2-28*i);      	 					      	 				    
       	 				}
       	 				else
       	 					this.generate(ItemManager.TYPE.A_SCORE, x + 14*i + 28*5, y - 28*i);
       	 					//aplus = ig.game.spawnEntity(EntityA, ig.system.width+14*i+28*5, ig.system.height/2-28*i);
       	 			}
       	 			else
       	 				this.generate(ItemManager.TYPE.A_SCORE, x + 14*i + 28*5, y - 28*6 + 28*(i-6));
       	 				//aplus = ig.game.spawnEntity(EntityA, ig.system.width+14*i+28*5, ig.system.height/2-28*6+28*(i-6));
       	 		}
    			break;
    		// F Pattern
        	case 7 :
        		for(var i = 1 ; i < 6 ; i ++){
        			this.generate(ItemManager.TYPE.F_SCORE, x + 28, y/2 - 28*i);
        			//f = ig.game.spawnEntity(EntityF, ig.system.width + 28 , ig.system.heigth/2 - 28*i );
        			
        			if( i == 3 ) {
        				for (var j = 1 ; j < 5 ; j ++ )
        					this.generate(ItemManager.TYPE.F_SCORE, x + 28*j, y/2 - 28*i);
        					//f = ig.game.spawnEntity(EntityF, ig.system.width + 28 * j , ig.system.height/2 - 28*i );
        			}
        			if( i == 5 ){
        				for (var j = 1 ; j < 5 ; j ++ )
        					this.generate(ItemManager.TYPE.F_SCORE, x + 28*j, y/2 - 28*i);
        					//f = ig.game.spawnEntity(EntityF, ig.system.width + 28 * j , ig.system.height/2 - 28*i );
        			}        			
        		}
        		break;
    		default:
    			console.log('item type not matched');
    			break;
        	}
             		
        },
        
        update: function () {
			
        }
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
        HEART_BREAK: 9,
        CAN_ITEM: 10,
        TWINKLE: 11
    };
    
    ItemManager.ARRANGE_TYPE = {
    	JUMP_GUIDE_LINE: 1,
    	SQUARE_3_5: 2,
    	SQUARE_7_2: 3,
    	HEART: 5,
    	A_PATTERN: 6,
    	F_PATTERN: 7
    };
    
    

//	EntitystarManager = ig.Entity.extend({
//
//		animSheet: new ig.AnimationSheet('media/new_img/star.png', 20, 20 ),
//		gravityFactor: 0,
//		timer1: new ig.Timer(1.2),
//		timer2: new ig.Timer(1.2),
//		type: ig.Entity.TYPE.B,
//		checkAgainst: ig.Entity.TYPE.A,
//		size : {x : 30, y: 15},
//		maxVel: {x:100, y: 1000},
//		state: 1,
//		isFlyBlock: 0,
//		
//		init: function (x,y,settings) {
//			this.parent(x,y,settings);
//			this.addAnim('idle', 1, [0]);
//			this.currentAnim = this.anims.idle;
//			//this.vel.y = 450;
//			//IM = new ItemManager();
//		},
//		
//		update: function(){
//			this.parent();	
//			if(this.timer1.delta()>2){
//				monster = ig.game.spawnEntity(EntityMonster, starManager.pos.x,300);
//				this.timer1.reset();
//				}
//			if(this.timer2.delta()>3){
//				spring = ig.game.spawnEntity(EntitySpring, starManager.pos.x,300);
//				this.timer2.reset();
//				}
//		},
//		
//		check: function (other) {
//			if( this.pos.y< ig.system.height/2){
//				IM.canPut = 0;
//			}
//			this.kill();
//		},
//
//		
//	});

});
