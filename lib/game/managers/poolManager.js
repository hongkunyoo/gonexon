ig.module(
	'game.managers.poolManager'
)
.requires(
)
.defines(function () {
	PoolManager = ig.Class.extend({
		
		earthPool : [],
		blockPool : [],
		monsterPool: [],
		itemPool: [],
				
        init: function () {
            
        },
        
        myInit: function(){
        	
        },
      
        update: function () {
            
        },
        
        getFromPool : function (TYPE, x, y, settings) {
    		var entities = ig.game.getEntitiesByType(TYPE);
    		
    		var pool = [];
    		for (var i = 0 ; i < entities.length ; i++) {
    			if (!entities._sleep)
    				pool.push(entities[i]);
    		}
    		
        	var entity = null;
        	
        	if (pool.length == 0) {
        		
        		var aaa = ig.game.spawnEntity(TYPE, x, y, settings);
        		console.log(aaa.parent);
        		return aaa;
        	}
        	
    		entity = pool[0];
    		ig.merge( entity.settings, settings );
    		if (entity._init != null) entity._init();
    		entity.pos.x = x;
        	entity.pos.y = y;
        	entity._sleep = false;
        	return entity;
        },
        
        returnToPool: function (entity) {
        	if (entity._sleep) return;
        	
        	entity.pos.x = -100;
        	entity.pos.y = 1000;
        	entity.vel = { x: 0, y: 0 }; 
        	entity.collides = ig.Entity.COLLIDES.NEVER;
        	entity._sleep = true;
        	
        	if (entity._destroy != null) entity._destroy();
        	
        }
        
        
    });
	 
	PoolManager.instance = null;
});

