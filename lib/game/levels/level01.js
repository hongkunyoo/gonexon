
ig.module('game.levels.level01')
.requires()
.defines(function() {

LEVEL01 = {
	bg : "",
	level : "LEVEL01",

	path : [ 
	{
		earth : [ 
			{ type : "SMALL",  x : 0, y : -20, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
			{ type : "MIDDLE", x : 0, y : -20, feature : "NORMAL" },
			{ type : "LARGE",  x : 0, y : -20, feature : "NORMAL" } 
		],
		block : [ 
		    { type : "SMALL", x : 10, y : 0, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
		    { type : "SMALL", x : 50, y : 0, feature : "NORMAL" }, 
		    { type : "SMALL", x : 5,  y : 0, feature : "NORMAL" }
		],
		monster : [
		    { type : "MONSTER01", x : 900, y : 100, feature : "NORMAL" },
		    { type : "MONSTER02", x : 800, y : 200, feature : "NORMAL" } 
		],
		item : [ 
		    { type : "pattern", x : 10, y : 0, feature : "NORMAL" },
		    { type : "pattern", x : 10, y : 0, feature : "NORMAL" }
		],
		playerSpeed : 200,
		earthSpeed : -400,
		blockSpeed : -400
	} 
	]
};

});