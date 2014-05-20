ig.module(
	'game.managers.earthManager'
)
.requires(
	'game.entities.earth',
	'game.managers.gameManager'
)
.defines(function () {
	 EarthManager = ig.Class.extend({
		 	
		 	tail : {
		 		pos : {x: -400, y: 360},
		 		size : {x: 760, y: 120}
		 	},
		 	
	        pool: {
	            "earth0": [],
	            "earth1": [],
	            "earth2": []	            
	        },
	    
	        //doVanishBlock: false,
	        
	        staticInstantiate: function () {
	            if (EarthManager.instance == null) {
	                return null;
	            }
	            else {
	                return EarthManager.instance;
	            }
	        },
	       
	        init: function () {
	            EarthManager.instance = this;
	            
	            GM = new GameManager();
	        	            
	           
	            // select three earth in the pool and set a tail
	            for(var i = 0 ; i < 3 ; i++){
	            	this.tail = this.getFromPool(this._earthSelector(),(this.tail.pos.x + this.tail.size.x), this.tail.pos.y);
	            }

	            
	        },
	      
	        update: function () {
	        	
	            var earths = ig.game.getEntitiesByType(EntityEarth);
	            for(var i = 0 ; i < earths.length ; i++){
	                if (earths[i].pos.x < -1366 && !earths[i].pushed) {
	                    this.returnToPool(earths[i]);
	                   	    	            
	    	            this.addEarthAfterTail();
	                }
	            }

	        },
	        
	        speedUp: function(speed){
	        	var earths = ig.game.getEntitiesByType(EntityEarth);
	        	for(var i = 0; i < earths.legth ; i++){
	        		if(!earths[i].pushed)
	        			earths[i].vel = {x : -speed, y : 0 }; 
	        	}
	        	
	        },
	        
	        addEarthAfterTail: function(){
	        	//console.log("in add Earth");
	        	var rnd = Math.random();
	        	if(rnd > 0.77){
	        		this.tail = this.getFromPool(this._earthSelector(),(this.tail.pos.x + this.tail.size.x), this.tail.pos.y);
	        	}else{
	        		//console.log("Á¶½É! ³¶¶°·¯Áö");
	        		this.tail = this.getFromPool(this._earthSelector(),(this.tail.pos.x + this.tail.size.x + 50), this.tail.pos.y);
	        	}
	        	
	        },

	        _earthSelector: function () {
	            var selected = parseInt((Math.random() * 1000)) % EarthManager.getTypeLength();
	            return selected;
	        },

/*	        _choosePos: function (axis) {  // , blockType ¾ø¾Ú!
	            var value;
	            if(axis == "x")
	                value = ig.system.realWidth+5; // µÚ²Ç¹«´Ï.pos.x + 1366 ·Î ¹Ù²ã¾ß!!!
	            else
	                value = 192; // (Math.random() * 1000) % 565 + 10;
	            return value;
	        },
	            
*/
	        getFromPool: function (type, x, y) {
	        	var earth = null;
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

	        returnToPool: function (earth) {
	            if (!earth.pushed) {
                	earth.pushed = true;
	                earth.collies = ig.Entity.COLLIDES.NEVER;
	                this.pool["earth" + earth.earthType].push(earth);
	          
	            	
	            }
	        },

	        
	        generate: function (TYPE, x, y, _settings) {
	            
	            switch (TYPE) {
	                case EarthManager.TYPE.WHITE:
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

	                case EarthManager.TYPE.YELLOW:
	                    return ig.game.spawnEntity(EntityEarth, x, y, {
	                        earthType: EarthManager.TYPE.YELLOW,
	                        animSheet: new ig.AnimationSheet('media/earth01.png', 760, 120),	                  
	                        size: { x: 760, y: 120 },
	                        maxVel: {x: 10000, y: 10000},
	                        vel: _settings ? _settings : ({ x: -200, y: 0 }), 
	                        collides: ig.Entity.COLLIDES.FIXED,

	                        _init: function () {

	                            this.addAnim('idle', 1, [0]);

	                        }

	                        /*_update: function () {

	                        } */
	                    });

	                case EarthManager.TYPE.BLACK:
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
	    
	    EarthManager.TYPE = {
	        WHITE: 0,
	        YELLOW: 1,
	        BLACK: 2
	            
	    };

	    EarthManager.getTypeLength = function(){
	        var count = 0;
	        for(var i in EarthManager.TYPE)
	            count++;
	        return count;
	    };
	    
	    EarthManager.instance = null;
	});

