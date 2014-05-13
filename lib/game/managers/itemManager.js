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
		timer: new ig.Timer(1.2),
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
			if(this.timer.delta()>2){
				monster = ig.game.spawnEntity(EntityMonster, coinManager.pos.x,300);
				this.timer.reset();
				
				console.log("이거되냐");
				}
			
		},
		
		check: function (other) {
			this.stats = 0;

			for(var i = coinManager.pos.y-50, n = 0 ; i > 70 && n < 6 ; i = i- 10, n++)
				coin = ig.game.spawnEntity(EntityCoin, coinManager.pos.x, i);
			
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
        timer2: new ig.Timer(0.009),
		coinTimer: new ig.Timer(0.5),
		
        map: {
            item0: [],
            item1: [],
            item2: [],
            item3: []
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
            
            ItemManager.instance = this;
            
			
        },
        
        myInit: function(){
        	this.timer = new ig.Timer(GM.itemSpeed);
        	coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width-7, 0);
        },
        
        generate: function (TYPE, x, y, _settings) {
            
        },

        update: function () {
			if(this.coinTimer.delta()>0){
				this.coinTimer.reset();
				coinManager = ig.game.spawnEntity(EntitycoinManager, ig.system.width+3, 0);
			}
           
        },

        _blockSelector: function () {
            

        },

        _choosePos: function (axis, blockType) {
        
        },

        getFromPool: function (type, x, y) {
            
        },

        returnToPool: function (item) {
            
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
