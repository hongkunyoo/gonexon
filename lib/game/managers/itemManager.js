ig.module(
	'game.managers.itemManager'
)
.requires(
	'game.entities.item',
	'game.managers.earthManager'
)
.defines(function () {

    //////////////////////////////////////////////////////////////
    //
    //  게임에서 필요한 아이템 관련 사항 생성 및 관리
    //
    //////////////////////////////////////////////////////////////
////////////////////
	EntitycoinManager = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/coin_gold.png', 10, 10 ),
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		size : {x : 10, y:10},
		maxVel: {x:100, y: 10000},
		state: 1,
		onBlocky: 0,
		count:0,
		timer: new ig.Timer(1.2),
		
		init: function (x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.vel.y = 400;
			EM = new EarthManager();
			//this.accel.y = -300;
		},
		
		update: function(){
			this.parent();	
			if(this.timer.delta()>2){
				monster = ig.game.spawnEntity(EntityMonster, coinManager.pos.x,300);
				this.timer.reset();
				
			}
			/*if(this.pos.y > ig.system.height-20){
				for(var i = EM.tail.pos.y-50, n = 0 ; i > 70 && n < 6 ; i = i- 27, n++)
					//coin = ig.game.spawnEntity(EntityCoin, coinManager.pos.x, i);
			}*/
			
		},
		
		check: function (other) {
			this.stats = 0;
			/*if(EM.tail.pos.y<coinManager.pos.yMath.random() < 0.3){console.log("죽어");
				for(var i = EM.tail.pos.y-50, n = 0 ; i > 70 && n < 6 ; i = i- 27, n++)
					coin = ig.game.spawnEntity(EntityCoin, coinManager.pos.x, i);
			}*/
			onBlocky = coinManager.pos.y;
			this.count++;
			
			this.kill();
        },  //coin을 놓는 함수!!
        
        
        draw: function() {
    		// Draw all entities and backgroundMaps
    	    this.parent();

    	    //this.font.draw("test",200,500);
    		
    	}

	});

	//////////////////////////
	ItemManager = ig.Class.extend({

        timer: null,
		coinTimer: new ig.Timer(0.09),
		setCoinTimer: new ig.Timer(1.2),
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
            this.timer = new ig.Timer(GM.itemSpeed);
            ItemManager.instance = this;
            coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width-7, 0);
			this.pool[0] = this.generate(ItemManager.TYPE.COIN);
        },

/*        generate: function (TYPE, x, y, _settings) {
            
        },
*/
        update: function () {
			if(this.coinTimer.delta()>0){
				this.coinTimer.reset();
				onblocky = coinManager.pos.y;
				coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width-5, 0);
			}
			if(this.setCoinTimer.delta()>0){
				this.setCoinTimer.reset();
				coin = ig.game.spawnEntity(EntityCoin, ig.system.width, onblocky);
				//coin = this.generate(1);
			
			}
			////////////////////여기에서 코인매니져에서 받은 그 y값으로 코인을 출력하기!!!!!
           
        },
/*
        _blockSelector: function () {
            

        },

        _choosePos: function (axis, blockType) {
        
        },
*/
        getFromPool: function (type, x, y) {
            var item = null;
            var rnd = Math.random();
            if (this.pool["earth"+type].length == 0) {
                earth = this.generate(type, x, y, GM.earthSpeed); 
                earth.vel = GM.earthSpeed;
            }
            else {
                earth = this.pool["earth" + type].pop();   
                earth.pos.x = x;
                earth.pos.y = y;
                /*if(rnd > 0.93){
                	earth.pos.y = y;
                }else{
                	 earth.pos.y = y-96;
                }*/	               
                earth.collies = ig.Entity.COLLIDES.FIXED;
                earth.pushed = false;
                earth.vel = GM.earthSpeed; 
            }
            return earth;
        },

        returnToPool: function (item) {
        	if (!item.pushed) {
            	item.pushed = true;
                //item.collies = ig.Entity.COLLIDES.NEVER;
                this.pool["item" + earth.earthType].push(item);
                console.log("return to item POOL!");
            	
            }//earthmanager보고 한 거라 나중에 확인!!
        },
        generate: function (TYPE) {
            
            switch (TYPE) {
                case ItemManager.TYPE.HEART:
                    return ig.game.spawnEntity(EntityEarth, x, y, {
                        earthType: EarthManager.TYPE.WHITE,
                        animSheet: new ig.AnimationSheet('media/earth00.png', 760, 120),
                        size: { x: 760, y: 120 },
                        maxVel: {x: 10000, y: 10000},
                        vel: _settings ? _settings : ({ x: -200, y: 0 }), 
                        collides: ig.Entity.COLLIDES.FIXED,	                        	                     
                        gravityFactor: 0,	
                        
                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        }

                        /*_update: function () {

                        }*/
                    });

                case ItemManager.TYPE.COIN:
                    return ig.game.spawnEntity(EntityCoin, ig.system.width, coinManager.onBlocky);

                case ItemManager.TYPE.JUMP:
                    return ig.game.spawnEntity(EntityEarth, x, y, {
                        earthType: EarthManager.TYPE.BLACK,
                        animSheet: new ig.AnimationSheet('media/earth02.png', 760, 120),
                        size: { x: 760, y: 120 },
                        maxVel: {x: 10000, y: 10000},
                        vel: _settings ? _settings : ({ x: -200, y: 0 }), 
                        collides: ig.Entity.COLLIDES.FIXED,
                        
                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        }

                        /*_update: function () {

                        }*/
                    });

                
            }

        }
    });
    
    ItemManager.instance = null;
    
    ItemManager.TYPE = {
        HEART: 0,
        COIN: 1,
        JUMP: 2,
        SUPER_JUMP: 3
    };

    ItemManager.getTypeLength = function () {
        var count = 0;
        for (var i in ItemManager.TYPE)
            count++;
        return count;
    };
});
