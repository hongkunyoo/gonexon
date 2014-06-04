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
		 	
	        /*pool: {
	            "earth0": [],
	            "earth1": [],
	            "earth2": []
	        },*/
	        
	        doVanishEarth: false,

/*	        staticInstantiate: function () {
	            if (EarthManager.instance == null) {
	                return null;
	            }
	            else {
	                return EarthManager.instance;
	            }
	        },*/
	       
	        init: function () {
	            // EarthManager.instance = this;
	            
	        },
	        
	        myInit: function(){
	        	GM = new GameManager();
	        	this.tail = {
			 		pos : {x: 0, y: 380},
			 		size : {x: 0, y: 0},
			 		
			 	};
	            for(var i = 0 ; i < 18 ; i++){
	            	
	            	this.tail = this.generate(this._earthSelector(),(this.tail.pos.x + this.tail.size.x + 0.05), this._chooseYPos());
	            }
	        },
	      
	        update: function () {
	        	
	            var earths = ig.game.getEntitiesByType(EntityEarth);
	            for(var i = 0 ; i < earths.length ; i++){
	                if(earths[i].pos.x < -350){
		    	            this.addEarthAfterTail(earths[i]);
	                }	
	            }    
	            
	            
	            if (GM.vanishEarthTime.delta() > 0) {
	                this._vanishEarth(GM.vanishEarthSpeed);
	                GM.vanishEarthTime.reset();
	            }

	        },
	        
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
	        	        
	        addEarthAfterTail: function(earth){
	        	
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
	        
	        generate: function (TYPE, x, y, _settings) {
	            
	            switch (TYPE) {
	                case EarthManager.TYPE.WHITE:	                
	                    return ig.game.spawnEntity(EntityEarth, x, y, {
	                        earthType: EarthManager.TYPE.WHITE,
	                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_type01.png', 250, 270),
	                        size: { x: 250, y: 270 },
	                        vel: _settings ? _settings : (GM.earthSpeed), 
	                        collides: GM.earthCollision,	                        	                     
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
	                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_type02.png', 300, 270),	                  
	                        size: { x: 300, y: 270 },
	                        vel: _settings ? _settings : (GM.earthSpeed), 
	                        collides: GM.earthCollision,

	                        _init: function () {

	                            this.addAnim('idle', 1, [0]);

	                        }

	                        /*_update: function () {

	                        } */
	                    });

	                case EarthManager.TYPE.BLACK:                	
	                    return ig.game.spawnEntity(EntityEarth, x, y, {
	                        earthType: EarthManager.TYPE.BLACK,
	                        animSheet: new ig.AnimationSheet('media/new_img/earth/B_type03.png', 350, 270),
	                        size: { x: 350, y: 270 },
	                        vel: _settings ? _settings : (GM.earthSpeed), 
	                        collides: GM.earthCollision,
	                        
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

