ig.module(
   'game.managers.blockManager'
)
.requires(
   'game.entities.block'
)
.defines(function () {

    BlockManager = ig.Class.extend({

    	pool: [],
    	
    	tail : {
			pos : {x: 900, y: 280},
			size : {x: 0, y: 0}
		},
    	
        init: function () {
        	BlockManager.instance = this;
        },
        
        myInit: function() {
        	var blocks = ig.game.getEntitiesByType( EntityBlock );
        	
        	for (var i = 0 ; i < blocks.length ; i++) {
        		this.returnToPool(blocks[i]);
        	}
        },

        update: function () {

           
        },
        
        fetchAndMake: function (arr) {
        	for (var i = 0 ; i < arr.length ; i++) {
        		this.tail = this.getFromPool(BlockManager.TYPE[arr[i].type], 
        				this.tail.pos.x + this.tail.size.x + arr[i].x ,
        				this.tail.pos.y + arr[i].y);
        	}
        	this.tail = EM.tail;
        	this.tail.pos.x -= this.tail.size.x;
        },
        
        _generate: function (TYPE, x, y, _settings) {
        	return ig.game.spawnEntity(EntityBlock, x, y, {
        		type: ig.Entity.TYPE.B,
                checkAgainst: ig.Entity.TYPE.A,
                gravityFactor: 0,
                
                vanishFlag : false,
                startSink: false,
                startSoar: false,
                
                _init: function () {
                	this.blockType = TYPE;
                    this.animSheet = BlockManager.LEVEL[GM.LEVEL][TYPE];
                    this.size = { x: this.animSheet.width, y: this.animSheet.height };
                    this.vel = GM.blockSpeed; 
                    this.collides = GM.earthCollision;	
                    
                    this.addAnim('idle', 1, [0]);
                    this._sleep = false;
                },
                
                _update: function () {
                	
                	if (this.currentAnim.alpha < 0.01) {
                		EM.returnToPool(this);
                	}
                	
                	if (this.pos.x < ig.system.realWidth){
                		if (this.vanishFlag) this.currentAnim.alpha -= GM.vanishSpeed;
                		if(this.startSink) this.pos.y += GM.sinkSpeed;
                		if(this.startSoar) this.pos.y -= GM.soarSpeed;
                	}
                	
                },
                
                _destroy: function () {
                	
                },
                
                feature: function(type) {
                	if (type == "VANISH") {
                		this.vanishFlag = true;
                	} else if (type == "SINK") {
                		this.startSink = true;
                	} else if (type == "SOAR"){
                		this.startSoar = true;
                	}
                }
            });
        	
        },
        
        getFromPool : function (TYPE, x, y) {
    		var a = [];
    		for( var i = 0; i < this.pool.length; i++ ) {
    			var ent = this.pool[i];
    			if( ent.blockType != null && ent.blockType == TYPE ) {
    				a.push( ent );
    			}
    		}
    		
        	var entity = null;
        	
        	if (a.length == 0) return this._generate(TYPE, x, y);
        	
    		entity = a[0];
    		if (entity._init != null) entity._init();
    		this.pool.erase(entity);
    		entity.pos.x = x;
        	entity.pos.y = y;
        	entity._sleep = false;
        	
        	return entity;
        },
        
        returnToPool: function (entity) {
        	if (entity._sleep) return;
        	
        	entity._sleep = true;
        	entity.pos.x = -100;
        	entity.pos.y = 1000;
        	entity.vel = { x: 0, y: 0 };
        	entity.collides = ig.Entity.COLLIDES.NEVER;
        	this.pool.push(entity);
        	
        	if (entity._destroy != null) entity._destroy();
        	
        }

    });
    BlockManager.TYPE = {
    	SMALL : "SMALL",
    	MIDDLE: "MIDDLE",
    	LARGE : "LARGE"
    };
    
    BlockManager.LEVEL = {
    	LEVEL01 : {
    		SMALL  : new ig.AnimationSheet('media/new_img/earth/B_skyblock-small.png', 130, 40),
    		MIDDLE : new ig.AnimationSheet('media/new_img/earth/B_skyblock-middle.png', 200, 40),
    		LARGE  : new ig.AnimationSheet('media/new_img/earth/B_skyblock-big.png', 260, 40)
    	},
    	LEVEL02 : {
    		SMALL  : new ig.AnimationSheet('media/new_img/earth/C_skyblock-small.png', 130, 40),
    		MIDDLE : new ig.AnimationSheet('media/new_img/earth/C_skyblock-middle.png', 200, 40),
    		LARGE  : new ig.AnimationSheet('media/new_img/earth/C_skyblock-big.png', 260, 40)
    	},
    	LEVEL03 : {
    		SMALL  : new ig.AnimationSheet('media/new_img/earth/A_skyblock-small.png', 130, 40),
    		MIDDLE : new ig.AnimationSheet('media/new_img/earth/A_skyblock-middle.png', 200, 40),
    		LARGE  : new ig.AnimationSheet('media/new_img/earth/A_skyblock-big.png', 260, 40)
    	}
    };
   
    
    BlockManager.instance = null;
 

    
});
