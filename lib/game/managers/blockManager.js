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

        baseB: {
        	pos : {x: 0, y: 0},
	 		size : { x: 0, y: 0 }
        },
        
        upperB: {
        	pos : {x: 0, y: 0},
	 		size : { x: 0, y: 0 }
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
        
        myInit: function() {
        	GM = new GameManager();
        	
            this.baseB = this.generateBase(0, -100, GM.blockSpeed);
            this.upperB = this.generateUpper(0, -200, GM.blockSpeed);
            
        },


        update: function () {

        	if(this.baseB.pos.x < -GM.blockSize.x)
        		this.returnToPool(this.baseB.blockType, this.baseB);
        	
        	if(this.upperB.pos.x < -GM.blockSize.x)
        		this.returnToPool(this.upperB.blockType, this.upperB);
        	
            
            var earths = ig.game.getEntitiesByType(EntityEarth);
            var earthHeight = null;
            var earthWidth = null;
            for(var i = 0 ; i < earths.length ; i++){
            	
            	earthHeight = earths[i].pos.y;
            	earthWidth = earths[i].pos.x;
            	if( !this.isBaseBlock && (earthHeight < 370) ){
            		this.drawBaseBlock(earthHeight, this.baseB);
            		this.isBaseBlock = true;
            	}
            	
            	
            }    
            
            
            
        },
        
        drawBaseBlock: function(y, base){
        	base.pos.x = ig.system.width;
        	base.pos.y = y - 140;
        	this.upperB.pos.x = base.pos.x + 220;
        	this.upperB.pos.y = base.pos.y - 50;
        	
        },

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
            	  
                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_skyblock-01.png', 200, 40),
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
             	  
                      animSheet: new ig.AnimationSheet('media/new_img/earth/B_skyblock-01.png', 200, 40),
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
