ig.module(
	'game.managers.earthManager'
)
.requires(
	'game.entities.earth',
	'game.managers.gameManager'
)
.defines(function () {
	EarthManager = ig.Class.extend({
		
		pool: [],
		
		tail : {
			pos : {x: 0, y: 380},
			size : {x: 0, y: 0}
			
		},
		 	
        init: function () {
        	EarthManager.instance = this;
        },
        
        myInit: function(){
        	
        	var earthes = ig.game.getEntitiesByType( EntityEarth );
        	
        	for (var i = 0 ; i < earthes.length ; i++) {
        		this.returnToPool(earthes[i]);
        	}
        	
        	for (var i = 0 ; i < 4 ; i++) {
        		this.tail = this._generate(EarthManager.TYPE.MIDDLE, this.tail.pos.x + this.tail.size.x + 0.05, 380);
        	}
        	
        },
      
        update: function () {

//        	if (this.tail.pos.x < ig.system.realWidth + 20) {
//        		this.tail = this._addEarthAfterTail();
//        	}
            
        },
        
//        _addEarthAfterTail: function () {
//        	return this._generate(EarthManager.TYPE.MIDDLE, this.tail.pos.x + this.tail.size.x + 0.05, 380);
//        },
        
        fetchAndMake: function (arr) {
        	for (var i = 0 ; i < arr.length ; i++) {
        		this.tail = this.getFromPool(EarthManager.TYPE[arr[i].type], this.tail.pos.x + this.tail.size.x + arr[i].x + 0.05, this.tail.pos.y + arr[i].y);
        	}
        },
        
        
        _generate: function (TYPE, x, y, _settings) {
        	return ig.game.spawnEntity(EntityEarth, x, y, {
        		type: ig.Entity.TYPE.B,
                checkAgainst: ig.Entity.TYPE.A,
                gravityFactor: 0,
                
                _init: function () {
                	this.earthType = TYPE;
                    this.animSheet = EarthManager.LEVEL[GM.LEVEL][TYPE];
                    this.size = { x: this.animSheet.width, y: this.animSheet.height };
                    this.vel = GM.earthSpeed; 
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
    			if( ent.earthType != null && ent.earthType == TYPE ) {
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
        
        
        
        //////////////////////////////////////////////////////
/*	        _changeEarthImage: function(){
	        	
	        	var oldEarths = ig.game.getEntitiesByType(EntityEarth);
	        	var num_oldEarths = oldEarths.length;
	        	
                for(var i = 0 ; i < 18 ; i++){
	            	
                	var newType = this._earthSelector();
                	var xPos = this.tail.pos.x + this.tail.size.x + 0.05;
                	var yPos = this._chooseYPos();             	
	            
	            	if(newType == EarthManager.TYPE.SMALL){
	            		this.tail = ig.game.spawnEntity(EntityEarth, xPos, yPos, {
	                        earthType: EarthManager.TYPE.SMALL,
	                        animSheet: new ig.AnimationSheet('media/new_img/earth/C_type01.png', 250, 270),
	                        size: { x: 250, y: 270 },
	                        vel: GM.earthSpeed, 
	                        collides: GM.earthCollision,	                        	                     
	                        gravityFactor: 0,	
	                        
	                        _init: function () {

	                            this.addAnim('idle', 1, [0]);

	                        }

	                    });
	            		
	            	}else if(newType == EarthManager.TYPE.MIDDLE){
	            		
	            		this.tail = ig.game.spawnEntity(EntityEarth, xPos, yPos, {
	                        earthType: EarthManager.TYPE.MIDDLE,
	                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_type02.png', 300, 270),	                  
	                        size: { x: 300, y: 270 },
	                        vel: GM.earthSpeed, 
	                        collides: GM.earthCollision,

	                        _init: function () {

	                            this.addAnim('idle', 1, [0]);

	                        }

	                    });
	            		
	            	}else{
	            		
	            		this.tail = ig.game.spawnEntity(EntityEarth, xPos, yPos, {
	                        earthType: EarthManager.TYPE.LARGE,
	                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_type03.png', 350, 270),
	                        size: { x: 350, y: 270 },
	                        vel: GM.earthSpeed, 
	                        collides: GM.earthCollision,
	                        
	                        _init: function () {

	                            this.addAnim('idle', 1, [0]);

	                        }

	                    });
	            		
	            	}
	            	
	            	while(true){
	            		
	            		
	            		for(var i = 0 ; i < oldEarths.length ; i++){
	            			if(oldEarths[i].pos.x < -350){
	            				oldEarths[i].kill();
	            				num_oldEarths--;
	            			}
	            			
	            		}
	            		
	            		if(num_oldEarths < 1)  break;
	            		
	            		
	            	}
		        	
	            
                }
	        	
	        },*/
        //////////////////////////////////////////////////////
        
        /*
        _vanishEarth: function(speed){
            var earths = ig.game.getEntitiesByType(EntityEarth);
            var candidate = [];
            for(var i = 0 ; i < earths.length ; i++){
                if((earths[i].pos.x > 0) && (earths[i].pos.x < 760)){
                    candidate.push(earths[i]);
                }
            }
            
            if(candidate.length == 0) return;
            var random = parseInt((Math.random() * 1000)) % candidate.length;
            
            var vanishTarget = candidate[random];
            vanishTarget.vanish(speed);
            
            candidate = null;
        },
        
        _chooseYPos: function () {
        	var value = null;
            var rnd = Math.floor((Math.random() * 1000) % 3);	  
            
                if( rnd == 0 ){
                	
                	value = this.tail.pos.y;
                	
                }else if( rnd == 1){
                	
                	value = this.tail.pos.y - 50;
                	
                	if( value < 330 ){
                		value = this.tail.pos.y;
                	}
                }else{
                	 
                	value = this.tail.pos.y + 45;
                	
                	if( value > 430){
                		value = this.tail.pos.y;
                	}
                }
                
                
            return value;
        },
        	        
        _addEarthAfterTail: function(earth){
        	
        	if (earth.currentAnim.alpha < 0){
        		earth.currentAnim.alpha = 1;
        	}	
	        	
        	var rnd = parseInt((Math.random() * 1000)) % 3;	 
        		
		    if(rnd == 0){
			      earth.pos.x = this.tail.pos.x + this.tail.size.x + 130.05;
			      earth.pos.y = this._chooseYPos();
		        				        		     			           
		    }else if(rnd == 1){
		          earth.pos.x = this.tail.pos.x + this.tail.size.x + 0.05;
				  earth.pos.y = this._chooseYPos();
				    
		    }else{
		          earth.pos.x = this.tail.pos.x + this.tail.size.x + 0.05;
				  earth.pos.y = this._chooseYPos();
		    }
			    
		    this.tail = earth;
        	  
             
        },

        _earthSelector: function () {
            var selected = parseInt((Math.random() * 1000)) % EarthManager.getTypeLength();
            return selected;
        },
        
        _generate: function (TYPE, x, y, _settings) {
            
            switch (TYPE) {
                case EarthManager.TYPE.SMALL:	                
                    return ig.game.spawnEntity(EntityEarth, x, y, {
                        earthType: EarthManager.TYPE.SMALL,
                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_type01.png', 250, 270),
                        size: { x: 250, y: 270 },
                        vel: _settings ? _settings : (GM.earthSpeed), 
                        collides: GM.earthCollision,	                        	                     
                        gravityFactor: 0,	
                        
                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        }

                    });

                case EarthManager.TYPE.MIDDLE:	                	
                    return ig.game.spawnEntity(EntityEarth, x, y, {
                        earthType: EarthManager.TYPE.MIDDLE,
                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_type02.png', 300, 270),	                  
                        size: { x: 300, y: 270 },
                        vel: _settings ? _settings : (GM.earthSpeed), 
                        collides: GM.earthCollision,

                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        }

                    });

                case EarthManager.TYPE.LARGE:                	
                    return ig.game.spawnEntity(EntityEarth, x, y, {
                        earthType: EarthManager.TYPE.LARGE,
                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_type03.png', 350, 270),
                        size: { x: 350, y: 270 },
                        vel: _settings ? _settings : (GM.earthSpeed), 
                        collides: GM.earthCollision,
                        
                        _init: function () {

                            this.addAnim('idle', 1, [0]);

                        }

                    });
            }
        }
        */
    });
	 
    EarthManager.TYPE = {
        SMALL: 0,
        MIDDLE: 1,
        LARGE: 2
    };
    
    
    EarthManager.LEVEL = {
    	LEVEL01 : {
    		0 : new ig.AnimationSheet('media/new_img/earth/B_type01.png', 250, 270),
    		1: new ig.AnimationSheet('media/new_img/earth/B_type02.png', 300, 270),
            2 : new ig.AnimationSheet('media/new_img/earth/B_type03.png', 350, 270)
    	},
    	LEVEL02 : {
    		SMALL : new ig.AnimationSheet('media/new_img/earth/C_type01.png', 250, 270),
    		MIDDLE: new ig.AnimationSheet('media/new_img/earth/C_type02.png', 300, 270),
            LARGE : new ig.AnimationSheet('media/new_img/earth/C_type03.png', 350, 270)
    	},
    	LEVEL03 : {
    		SMALL : new ig.AnimationSheet('media/new_img/earth/A_type01.png', 250, 270),
    		MIDDLE: new ig.AnimationSheet('media/new_img/earth/A_type02.png', 300, 270),
            LARGE : new ig.AnimationSheet('media/new_img/earth/A_type03.png', 350, 270)
    	}
    };

    EarthManager.getTypeLength = function(){
        var count = 0;
        for(var i in EarthManager.TYPE)
            count++;
        return count;
    };
    
    EarthManager.instance = null;
});

