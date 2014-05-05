ig.module(
	'game.manager.earthManager'
)
.requires(
	'game.entities.earth'
)
.defines(function () {
	 EarthManager = ig.Class.extend({

	        timer: new ig.Timer(0.5),

	    
	        map: {
	            "earth0": [],
	            "earth1": [],
	            "earth2": []	            
	        },
	        
	        //doVanishBlock: false,

	       
	        init: function () {

	            EarthManager.instance = this;

	        },


	        update: function () {

	            var earths = ig.game.getEntitiesByType(EntityEarth);
	            for(var i = 0 ; i < earths.length ; i++){
	                if (earths[i].pos.x < -1366 && !earths[i].pushed) {
	                    this.returnToPool(earths[i]);
	                }
	            }

	            var type = this._earthSelector();
	            var x = this._choosePos("x");  // ,type 없앰!
	            var y = this._choosePos("y");
	            
	            if (this.timer.delta() > 0) {   // if문을 entity 사라졌으면!!!!! 으로 고쳐야
	                this.timer.reset();
	                this.getFromPool(type, x, y);
	            }
	           
	            //console.log(GM.blockSpeed);
	        

	        },

	        _earthSelector: function () {
	            
	            return parseInt((Math.random() * 1000)) % EarthManager.getTypeLength();
	        },

	        _choosePos: function (axis) {  // , blockType 없앰!
	            var value;
	            if(axis == "x")
	                value = ig.system.realWidth+5; // 뒤꽁무니.pos.x + 1366 로 바꿔야!!!
	            else
	                value = 192; // (Math.random() * 1000) % 565 + 10;
	            return value;
	        },

	        /*_generateFloor: function (y) {
	            
	            if (this._isEmpty()) {
	                this.getFromPool(BlockManager.TYPE.SIZE_120, 650, y);
	            }
	            
	        },*/
	        
	        /*_isEmpty: function () {

	            var ens = ig.game.getEntitiesByType(EntityEarth);
	            for(var i = 0 ; i < ens.length ; i++){
	                if (ens[i].pos.x > ig.system.realWidth - 90) // 이 부분 고쳐야
	                    return false;
	            }
	            return true;
	        }, */

	        getFromPool: function (type, x, y) {
	            if (this.map["earth"+type].length == 0) {
	                this.generate(type, x, y, GM.earthSpeed); 
	            }
	            else {
	                var earth = this.map["earth" + type].pop();   
	                earth.pos.x = x;
	                earth.pos.y = y;
	                
	                earth.vel = GM.earthSpeed.vel; // 그냥 GM.earthSpeed; 아닌가?
	            }
	        },

	        returnToPool: function (earth) {
	            if (!earth.pushed) {
	                earth.pushed = true;
	                this.map["earth" + earth.earthType].push(earth);
	            }
	        },

	        /*_vanishBlock: function(speed){
	            var blocks = ig.game.getEntitiesByType(EntityBlock);

	            for(var i = 0 ; i < blocks.length ; i++){
	                var b = blocks[i];
	                if(b.pos.x > 0 && !b.pushed){
	                    b.vanish(speed);
	                }
	            }

	        },*/

	        
	        generate: function (TYPE, x, y, _settings) {
	            
	            switch (TYPE) {
	                case EarthManager.TYPE.WHITE:
	                    return ig.game.spawnEntity(EntityEarth, x, y, {
	                        earthType: EarthManager.TYPE.WHITE,
	                        animSheet: new ig.AnimationSheet('media/earth0.png', 1366, 192),
	                        size: { x: 1366, y: 192 },
	                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }), // _setting.vel 이 머지?

	                        _init: function () {

	                            this.addAnim('idle', 1, [0]);

	                        }

	                        /*_update: function () {

	                        }*/
	                    });

	                case EarthManager.TYPE.YELLOW:
	                    return ig.game.spawnEntity(EntityEarth, x, y, {
	                        earthType: BlockManager.TYPE.YELLOW,
	                        animSheet: new ig.AnimationSheet('media/earth1.png', 1366, 192),
	                        size: { x: 1366, y: 192 },
	                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }),

	                        _init: function () {

	                            this.addAnim('idle', 1, [0]);

	                        }

	                        /*_update: function () {

	                        } */
	                    });

	                case EarthManager.TYPE.BLACK:
	                    return ig.game.spawnEntity(EntityEarth, x, y, {
	                        earthType: EarthManager.TYPE.BALCK,
	                        animSheet: new ig.AnimationSheet('media/earth2.png', 1366, 192),
	                        size: { x: 1366, y: 192 },
	                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }),

	                        _init: function () {

	                            this.addAnim('idle', 1, [0]);

	                        }

	                        /*_update: function () {

	                        }*/
	                    });

	                case EarthManager.TYPE.PINK:
	                    return ig.game.spawnEntity(EntityEarth, x, y, {
	                        earthType: EarthManager.TYPE.PINK,
	                        animSheet: new ig.AnimationSheet('media/earth3.png', 1366, 192),
	                        size: { x: 1366, y: 192 },
	                        vel: _settings ? (_settings.vel ? (_settings.vel) : ({ x: -200, y: 0 })) : ({ x: -200, y: 0 }),

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
	        BLACK: 2,
	        PINK: 3	        
	    };

	    EarthManager.getTypeLength = function(){
	        var count = 0;
	        for(var i in EarthManager.TYPE)
	            count++;
	        return count;
	    };
	});

