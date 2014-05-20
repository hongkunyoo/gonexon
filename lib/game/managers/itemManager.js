ig.module(
	'game.managers.itemManager'
)
.requires(
	'game.entities.item'
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
		timer1: new ig.Timer(1.2),
		timer2: new ig.Timer(1.2),
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		size : {x : 15, y:15},
		maxVel: {x:100, y: 1000},
		state: 1,
		onBlocky: 0,
		count:0,
		
		init: function (x,y,settings) {
			this.parent(x,y,settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.vel.y = 450;
			//this.accel.y = -300;
		},
		
		update: function(){
			this.parent();	
			if(this.timer1.delta()>2){
				monster = ig.game.spawnEntity(EntityMonster, coinManager.pos.x,300);

				this.timer1.reset();
				}
			if(this.timer2.delta()>3){
				spring = ig.game.spawnEntity(EntitySpring, coinManager.pos.x,300);
				this.timer2.reset();
				console.log("생서됨1");

				}
			
		},
		
		check: function (other) {
			this.stats = 0;
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
            
            //ItemManager.instance = this;
            
			
        },
        
        myInit: function(){
        	this.timer = new ig.Timer(GM.itemSpeed);
        	coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width-7, 0);
			this.pool[0] = this.generate(ItemManager.TYPE.COIN);
        },
        
        generate: function (TYPE, x, y, _settings) {
            
            switch (TYPE) {
           	 case ItemManager.TYPE.COIN:
                    return ig.game.spawnEntity(EntityCoin, ig.system.width, coinManager.onBlocky);
            }
        },

        itemArrange: function(num){
        	switch (num) {
        	 case 0:
        			break;
           	 case 1:
           	 		for(i = 1 ; i< 8; i++){
           	 			if(i<5)
           	 				coin = ig.game.spawnEntity(EntityCoin, ig.system.width+27*i, ig.system.height/2-27*i);
           	 			else
           	 				coin = ig.game.spawnEntity(EntityCoin, ig.system.width+27*i, ig.system.height/2-27*4+27*(i-4));
           	 		}
        			break;
           	 case 2:
           	 		for(i=1;i<5; i++){
           	 			coin = ig.game.spawnEntity(EntityCoin, ig.system.width, ig.system.height/2-27*i);
           	 		}
        			break;
           	 		
         }           
             		
            
        },
        
        update: function () {
			if(this.coinTimer.delta()>0){
				this.coinTimer.reset();
				coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
			}
			if(this.setCoinTimer.delta()>0){
				this.setCoinTimer.reset();
				//coin = this.pool[0];
				coin = this.generate(1);
				this.itemArrange( Math.floor((Math.random() * 1000) % 3));
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
        COIN: 1,
        JUMP: 2,
        SUPER_JUMP: 3
    };

});
