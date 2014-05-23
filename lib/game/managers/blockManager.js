ig.module(
	'game.managers.blockManager'
)
.requires(
	'game.entities.block',
	'game.managers.gameManager',
	'game.entities.earth'
)
.defines(function () {

    BlockManager = ig.Class.extend({

    	/* pool: {
	            "block0": [],
	            "block1": []
	     }, */
    	
    	
        baseB: {
        
        	pos : {x: 0, y: 0},
	 		size : { x: 180, y: 50 }
        	
        },
        
        upperB: {
        	pos : {x: 0, y: 0},
	 		size : { x: 180, y: 50 }
        },
        
        isBaseBlock: false,
        
        
//        staticInstantiate: function () {
//            if (BlockManager.instance == null) {
//                return null;
//            }
//            else {
//                return BlockManager.instance;
//            }
//        },

        init: function () {

//            BlockManager.instance = this;

        },
        
        myInit: function(){
        	GM = new GameManager();
        	
            this.baseB = this.generateBase(0, -100, GM.blockSpeed);
            this.upperB = this.generateUpper(0, -200, GM.blockSpeed);
            
        },


        update: function () {

        	if(this.baseB.pos.x < -GM.blockSize.x)
        		this.returnToPool(this.baseB.blockType, this.baseB);
        	
        	if(this.upperB.pos.x < -GM.blockSize.x)
        		this.returnToPool(this.upperB.blockType, this.upperB);
        	
            /*var blocks = ig.game.getEntitiesByType(EntityBlock);
            for(var i = 0 ; i < blocks.length ; i++){
                if (blocks[i].pos.x < -GM.blockSize.x) {
                	 this.returnToPool(blocks[i].blockType, blocks[i]);
                }
            }*/
            
            var earths = ig.game.getEntitiesByType(EntityEarth);
            var earthHeight = null;
            var earthWidth = null;
            for(var i = 0 ; i < earths.length ; i++){
            	
            	earthHeight = earths[i].pos.y;
            	earthWidth = earths[i].pos.x;
            	if((earthHeight < 350) && (this.isBaseBlock == false)){
            		this.drawBaseBlock(earthHeight, earthWidth, this.baseB);
            		this.isBaseBlock = true;
            	}
            }

            
        },
        
        drawBaseBlock: function(x, y, base){
        	base.pos.x = x + 100;
        	base.pos.y = y - 100;
        	this.upperB.pos.x = base.pos.x + 210;
        	this.upperB.pos.y = base.pos.y - 60;
        	
        },
        
//        getFromPool: function (x, y) {
//        	var earth = null;
//            if (this.pool["earth"+type].length == 0) {
//                earth = this.generate(type, x, y, GM.earthSpeed); 
//            }
//            else {
//                earth = this.pool["earth" + type].pop();   
//                earth.pos.x = x;
//                earth.pos.y = y;
//  
//                earth.collies = ig.Entity.COLLIDES.FIXED;
//                earth.pushed = false;
//            }
//            return earth;
//        },

        returnToPool: function (type, block) {
        	if(type == 0){
        		block.pos.y = -100;
        		
        	}else{
        		block.pos.y = -200;
        		this.isBaseBlock = false;
        	}
            	
        },


        generateBase: function (x, y, _settings) {
            
                 return ig.game.spawnEntity(EntityBlock, x, y, {
            	  
                        animSheet: new ig.AnimationSheet('media/block_star0.png', 180, 50),
                        size: GM.blockSize,
                        blockType: BlockManager.TYPE.BASE,
                        pos: {x: x, y: y},
                        vel: _settings ? _settings : (GM.blockSpeed),

                        _init: function () {

                            this.addAnim('idle', 1, [0]);
                            	
                        },
                        
                        _update: function(){
                        
                        }
                        	
                 });


        },
        
        generateUpper: function (x, y, _settings){
        	
        	     return ig.game.spawnEntity(EntityBlock, x, y, {
             	  
                      animSheet: new ig.AnimationSheet('media/block_star1.png', 180, 50),
                      size: GM.blockSize,
                      pos: {x: x, y: y},
                      blockType: BlockManager.TYPE.UPPER,
                      vel: _settings ? _settings : (GM.blockSpeed),

                      _init: function () {

                          this.addAnim('idle', 1, [0]);
                      },

                      _update: function () {

                      }
                      
                });
        	
        }


    });
    
    BlockManager.TYPE = {
	        BASE: 0,
	        UPPER: 1
	    };

	
    
    BlockManager.instance = null;
 

    
});
