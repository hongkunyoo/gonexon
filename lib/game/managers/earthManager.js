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
//		
//		tail : {
//			pos : {x: 0, y: 380},
//			size : {x: 0, y: 0}
//			
//		},
		 	
        init: function () {
        	EarthManager.instance = this;
        },
        
        myInit: function(){
        	
        	var earthes = ig.game.getEntitiesByType( EntityEarth );
        	
        	for (var i = 0 ; i < earthes.length ; i++) {
        		this.returnToPool(earthes[i]);
        	}
        	
        	for (var i = 0 ; i < 4 ; i++) {
        		GM.currentEarth = this._generate(EarthManager.TYPE.MIDDLE, GM.currentEarth.pos.x + GM.currentEarth.size.x + 0.05, 380);
        	}
        	
        },
      
        update: function () {
            
        },
        
        
        fetchAndMake: function (arr) {
        	for (var i = 0 ; i < arr.length ; i++) {
        		this.tail = this.getFromPool(EarthManager.TYPE[arr[i].type], this.tail.pos.x + this.tail.size.x + arr[i].x + 0.05, this.tail.pos.y + arr[i].y);
        		this.tail.feature(arr[i].feature);
        	}
        },
        
        
        _generate: function (TYPE, x, y, _settings) {
        	return ig.game.spawnEntity(EntityEarth, x, y, {
        		type: ig.Entity.TYPE.B,
                checkAgainst: ig.Entity.TYPE.A,
                gravityFactor: 0,
                
                vanishFlag : false,
                startSink: false,
                startSoar: false,
                waveFlag: false,
                waveSwitch : true,
                timer : new ig.Timer(0.5),
                
                _init: function () {
                	this.earthType = TYPE;
                    this.animSheet = EarthManager.LEVEL[GM.LEVEL][TYPE];
                    this.size = { x: this.animSheet.width, y: this.animSheet.height };
                    this.vel = GM.earthSpeed; 
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
                		if (this.startSink) this.pos.y += GM.sinkSpeed;
                		if (this.startSoar) this.pos.y -= GM.soarSpeed;
                		if (this.waveFlag) {
                			if (this.waveSwitch) {
                				this.pos.y += GM.sinkSpeed;
                			} else {
                				this.pos.y -= GM.soarSpeed;
                			}
                			if (this.timer.delta() > 3) {
                				this.waveSwitch = !this.waveSwitch;
                				this.timer.reset();
                			}
                		}
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
                	} else if (type == "WAVE") {
                		this.waveFlag = true;
                	}
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
        

    });
	 
    EarthManager.TYPE = {
        SMALL: "SMALL",
        MIDDLE: "MIDDLE",
        LARGE: "LARGE"
    };
    
    EarthManager.LEVEL = {
    	LEVEL01 : {
    		SMALL : new ig.AnimationSheet('media/new_img/earth/B_type01.png', 250, 270),
    		MIDDLE: new ig.AnimationSheet('media/new_img/earth/B_type02.png', 300, 270),
    		LARGE : new ig.AnimationSheet('media/new_img/earth/B_type03.png', 350, 270)
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

