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

        },
        
        myInit: function() {
           
            
        },


        update: function () {

           
        },
        
        fetchAndMake: function (arr) {
        	for (var i = 0 ; i < arr.length ; i++) {
        		this.tail = this.getFromPool(arr[i].type, EM.tail.pos.x + this.tail.pos.x + arr[i].x , -80 + this.tail.pos.y + arr[i].y);
        	}
        },
        
        _generate: function (TYPE, x, y, _settings) {
        	return ig.game.spawnEntity(EntityBlock, x, y, {
        		type: ig.Entity.TYPE.B,
                checkAgainst: ig.Entity.TYPE.A,
                gravityFactor: 0,
                
                _init: function () {
                	this.blockType = TYPE;
                    this.animSheet = BlockManager.LEVEL[GM.LEVEL];
                    this.size = { x: this.animSheet.width, y: this.animSheet.height };
                    this.vel = GM.blockSpeed; 
                    this.collides = GM.earthCollision;	
                    
                    this.addAnim('idle', 1, [0]);
                },
                
                _update: function () {
                	
                },
                
                _destroy: function () {
                	
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
    	SMALL: 0,
    };
    
    BlockManager.LEVEL = {
    	LEVEL01 : new ig.AnimationSheet('media/new_img/earth/B_skyblock-01.png', 200, 40),
    	LEVEL02 : new ig.AnimationSheet('media/new_img/earth/C_skyblock-01.png', 200, 40),
    	LEVEL03 : new ig.AnimationSheet('media/new_img/earth/B_skyblock-01.png', 200, 40)
    };
   
    
    BlockManager.instance = null;
 

    
});
