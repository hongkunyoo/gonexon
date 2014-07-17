
ig.module('game.levels.level01')
.requires()
.defines(function() {

LEVEL01 = {
		
	// Level Variables
	COIN: 0,
	HEART: 3,
	STAR: 0,
	SCORE: 0,
	CAN: 5,
	
	bg : "",
	level : "LEVEL01",

	path : [ 
	{
		// Path Variables
		WALK_SPEED : 200,
		JUMP : -700,
		ACCEL_GROUND: 500,
		ACCEL_AIR: 250,
		
		springPower: -1000,
		
		earthSpeed : -400,
		blockSpeed : -400,
		sinkSpeed: 0.3,
		soarSpeed: 0.3,
		vanishSpeed: 0.01,
		itemSpeed : -400,
		
		shakeAmlitude: 0,
		
		earth : [ 
			{ type : "SMALL",  x : 0, y : -20, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
			{ type : "MIDDLE", x : 0, y : -20, feature : "VANISH" },
			{ type : "LARGE",  x : 0, y : -20, feature : "NORMAL" }, 
			{ type : "LARGE",  x : 0, y : -20, feature : "SOAR" },
			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" }
		],
		block : [ 
		    { type : "SMALL", x : 10, y : 0, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
		    { type : "SMALL", x : 200, y : 0, feature : "NORMAL" }, 
		    { type : "SMALL", x : 5,  y : 0, feature : "NORMAL" },
		    { type : "SMALL", x : 50,  y : -150, feature : "NORMAL" },
		    { type : "SMALL", x : 100,  y : 0, feature : "NORMAL" },
		    { type : "SMALL", x : 300,  y : 0, feature : "NORMAL" }
		],
		monster : [
		    { type : "MONSTER01", x : 900, y : 100, feature : "NORMAL" },// feature { NORMAL, RAGEOUS }
		    { type : "MONSTER02", x : 800, y : 200, feature : "NORMAL" } 
		],
		item : [ 
		    { type : "pattern", x : 10, y : 0, feature : "NORMAL" },// feature { NORMAL }
		    { type : "pattern", x : 10, y : 0, feature : "NORMAL" }
		]
	} 
	]
};

});