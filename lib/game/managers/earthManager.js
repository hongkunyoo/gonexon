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
		 		pos : {x: 0, y: 380},
		 		size : {x: 0, y: 0}
		 		
		 	},
		 	
//		 	imageChanged: false,
	        doVanishEarth: false,
	       
	        init: function () {
	            
	        },
	        
	        myInit: function(){
	        	GM = new GameManager();
	        	this.tail = {
			 		pos : {x: 0, y: 380},
			 		size : {x: 0, y: 0},
			 		
			 	};
	        	
	            for(var i = 0 ; i < 10 ; i++){
	            	
	            	this.tail = this._generate(this._earthSelector(),(this.tail.pos.x + this.tail.size.x + 0.05), this._chooseYPos());
	            }
	        },
	      
	        update: function () {
	        	
	            var earths = ig.game.getEntitiesByType(EntityEarth);
	            for(var i = 0 ; i < earths.length ; i++){
	                if(earths[i].pos.x < -350){
		    	            this._addEarthAfterTail(earths[i]);
	                }	
	            }    
	            
	            
	            if (GM.vanishEarthTime.delta() > 0) {
	                this._vanishEarth(GM.vanishEarthSpeed);
	                GM.vanishEarthTime.reset();
	            }
	            
/*	            if( !this.imageChanged && GM.COIN > 10){
	            	this.imageChanged = true;
	            	this._changeEarthImage();
	            }*/
	            
	        },
	        
/*	        _changeEarthImage: function(){
	        	
	        	var oldEarths = ig.game.getEntitiesByType(EntityEarth);
	        	var num_oldEarths = oldEarths.length;
	        	
                for(var i = 0 ; i < 10 ; i++){
	            	
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


	    });
	 
	    EarthManager.TYPE = {
	        SMALL: 0,
	        MIDDLE: 1,
	        LARGE: 2
	            
	    };

	    EarthManager.getTypeLength = function(){
	        var count = 0;
	        for(var i in EarthManager.TYPE)
	            count++;
	        return count;
	    };
	    
	    EarthManager.instance = null;
	});

