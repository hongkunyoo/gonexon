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
		 		pos : {x: 200, y: 380},
		 		size : {x: 250, y: 100},
		 		type : 0
		 		
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
	        	
	            var type = null;
	           
	            for(var i = 0 ; i < 5 ; i++){
	            	//this.tail = this.getFromPool(this._earthSelector(),(this.tail.pos.x + this.tail.size.x), this._chooseYPos()); */
	            	
	            	type = this._earthSelector();
	            	if( this.tail.type == 2 ){
	            		this.tail = this.getFromPool(type,(this.tail.pos.x + this.tail.size.x + 10), this._chooseYPos());
	            		this.tail.type = type;
	            	}else{
	            		this.tail = this.getFromPool(type,(this.tail.pos.x + this.tail.size.x + 0.005), this._chooseYPos());	
	            		this.tail.type = type;
	            	} 
	            	
	            }

	            
	        },
	      
	        update: function () {
	        	
	            var earths = ig.game.getEntitiesByType(EntityEarth);
	            for(var i = 0 ; i < earths.length ; i++){
	                if (earths[i].pos.x < -260 && !earths[i].pushed) {
	                    this.returnToPool(earths[i]);
	                   	    	            
	    	            this.addEarthAfterTail();
	                }
	            }

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
	        	        
	        addEarthAfterTail: function(){
	        	console.log("in add Earth");
	        	
	        	var rnd = Math.floor((Math.random() * 1000) % 3);	  
	        	
/*	        	if(rnd == 0){
       		     this.tail = this.getFromPool(this._earthSelector(),(this.tail.pos.x + this.tail.size.x + 70), this._chooseYPos());
          
  	           	}else if(rnd == 1){
       		
       		     this.tail = this.getFromPool(this._earthSelector(),(this.tail.pos.x + this.tail.size.x), this._chooseYPos());
             
  	           	}else{
               	
       		     this.tail = this.getFromPool(this._earthSelector(),(this.tail.pos.x + this.tail.size.x), this._chooseYPos());
  	           	}
  	           	
*/
	        	
	        	var type = this._earthSelector();
	        	
	        	
	        	if( this.tail.type == 2){
		        		if(rnd == 0){
			        		     this.tail = this.getFromPool(type,(this.tail.pos.x + this.tail.size.x + 70), this._chooseYPos());
			        		     this.tail.type = type;
			        		     
			           
		        		}else if(rnd == 1){
			        		
			        		     this.tail = this.getFromPool(type,(this.tail.pos.x + this.tail.size.x + 0.005), this._chooseYPos());
			        		     this.tail.type = type;
			        		     
			            }else{
			        		     this.tail = this.getFromPool(type,(this.tail.pos.x + this.tail.size.x + 0.005), this._chooseYPos());
			        		     this.tail.type = type;
			        	}
		        		
		        }else{
		        		
		        		if(rnd == 0){
		        		     this.tail = this.getFromPool(type,(this.tail.pos.x + this.tail.size.x + 60), this._chooseYPos());
		        		     this.tail.type = type;
		        		     
		           
	       	           	}else if(rnd == 1){
		        		
		        		     this.tail = this.getFromPool(type,(this.tail.pos.x + this.tail.size.x + 0.005), this._chooseYPos());
		        		     this.tail.type = type;
		              
	       	           	}else{
		                	
		        		     this.tail = this.getFromPool(type,(this.tail.pos.x + this.tail.size.x + 0.005), this._chooseYPos());
		        		     this.tail.type = type;
		        	    }
		        	
	             }
	        	        	
	        	
	        },

	        _earthSelector: function () {
	            var selected = parseInt((Math.random() * 1000)) % EarthManager.getTypeLength();
	            return selected;
	        },
	        
	        speedUpTo: function(speed){
	        	var earths = ig.game.getEntitiesByType(EntityEarth);
	        	for(var i = 0; i < earths.legth ; i++){
	        		if(!earths[i].pushed)
	        			earths[i].vel = {x : -speed, y : 0 }; 
	        	}
	        	
	        },
	        
	        speedUpBy: function(speed){
	        	var earths = ig.game.getEntitiesByType(EntityEarth);
	        	var oriSpeed = null;
	        	for(var i = 0; i < earths.legth ; i++){
	        		if(!earths[i].pushed)
	        			oriSpeed = earths[i].vel.x;
	        			earths[i].vel = {x : oriSpeed-speed, y : 0 }; 
	        	}
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
	            if (this.pool["earth"+type].length == 0) {
	                earth = this.generate(type, x, y, GM.earthSpeed); 
	                earth.vel = GM.earthSpeed;
	            }
	            else {
	                earth = this.pool["earth" + type].pop();   
	                earth.pos.x = x;
	                earth.pos.y = y;
      
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
	                console.log("return to POOL!");
	            	
	            }
	        },

	        
	        generate: function (TYPE, x, y, _settings) {
	            
	            switch (TYPE) {
	                case EarthManager.TYPE.WHITE:	                
	                    return ig.game.spawnEntity(EntityEarth, x, y, {
	                        earthType: EarthManager.TYPE.WHITE,
	                        animSheet: new ig.AnimationSheet('media/earth00.png', 250, 270),
	                        size: { x: 250, y: 270 },
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
	                        animSheet: new ig.AnimationSheet('media/earth01.png', 250, 270),	                  
	                        size: { x: 250, y: 270 },
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
	                        animSheet: new ig.AnimationSheet('media/earth02.png', 260, 270),
	                        size: { x: 260, y: 270 },
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

