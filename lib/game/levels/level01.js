
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
	
	bg : "media/sound/ogg/bgm01.ogg",
	level : "LEVEL01",

	
//	WALK_SPEED : 300,
	WALK_SPEED : 450,
	JUMP : -700,
	ACCEL_GROUND: 500,
	ACCEL_AIR: 250,
	
	springPower: -1200,
	
	//earthSpeed : -400,
	earthSpeed : 0,
	blockSpeed : -400,
	sinkSpeed: 0.8,
	soarSpeed: 0.8,
	vanishSpeed: 0.01,
	itemSpeed : -400,
	
	shakeAmlitude: 0,
	
	path : [
	    {
	    	earth : { type : "LARGE", x : 0, y : 0, feature : "NORMAL" },
	    	block : [
    	         	{ type : "MIDDLE", x : 1000, y : 400, feature : "NORMAL" }
	        ],
	    	monster : [
	    	        { type : "MONSTER01", x : 700, y : 10, feature : "NORMAL" }
            ],
	    	item : [
	    	        { type : "JUMP_GUIDE_LINE", x : 800, y : 20, feature : "NORMAL" },
	    	        { type : "JUMP_GUIDE_LINE", x : 800, y : 40, feature : "NORMAL" },
	    	        { type : "JUMP_GUIDE_LINE", x : 800, y : 60, feature : "NORMAL" }
	        ]
	    },
	    {
	    	earth : { type : "LARGE", x : 0, y : 0, feature : "NORMAL" },
	    	monster :  [
	    	        { type : "MONSTER01", x : 500, y : 10, feature : "NORMAL" }
            ],
	    	item : [
				{ type : "JUMP_GUIDE_LINE", x : 50, y : 0, feature : "NORMAL" },
				{ type : "JUMP_GUIDE_LINE", x : 50, y : 20, feature : "NORMAL" },
				{ type : "JUMP_GUIDE_LINE", x : 50, y : 40, feature : "NORMAL" }
    		]
	    },
	    {
	    	earth : { type : "LARGE", x : 0, y : 0, feature : "NORMAL" },
	    	item : [
				{ type : "SQUARE_7_2", x : 350, y : 100, feature : "NORMAL" },
				{ type : "SQUARE_7_2", x : 350, y : 130, feature : "NORMAL" }
    		]
	    },
	    {
	    	earth : { type : "LARGE", x : 500, y : 0, feature : "NORMAL" }
	    },
	    {
	    	earth : { type : "LARGE", x : 0, y : 0, feature : "NORMAL" },
	    	item : [
	    	        { type : "SPRING", x : 1400, y : 10, feature : "NORMAL" }
    	        ]
	    },
	    {
	    	earth : { type : "LARGE", x : 570, y : 0, feature : "NORMAL" },
	    	block :[
    	        	{ type : "MIDDLE", x : 300, y : 70, feature : "NORMAL" }
	        ],
	    	item : [
	    	        { type : "HEART", x : 900, y : 90, feature : "NORMAL" }
    	        ]
    	        
	    },
	    {
	    	block :[
    	        	{ type : "SMALL", x : 700, y : 90, feature : "NORMAL" }
	        ]
	    },
	    {
	    	earth : { type : "MIDDLE", x : 10, y : 0, feature : "NORMAL" },
	    	block :[
    	        	{ type : "MIDDLE", x : 300, y : 70, feature : "NORMAL" }
	        ],
	    	item : [
	    	        { type : "HEART", x : 900, y : 90, feature : "NORMAL" }
    	        ]
	    }
	],
	
	
//	
//    ItemManager.TYPE = {
//	        HEART: 0,
//	        STAR: 1,
//	        COIN : 2,
//	        A_SCORE: 3,
//	        F_SCORE: 4,
//	        SPRING: 5,
//	        CAN: 6,
//	        MONSTER01: 7,
//	        MONSTER02: 8,
//	        HEART_BREAK: 9,
//	        CAN_ITEM: 10,
//	        TWINKLE: 11
//	    };
//	    
//	    ItemManager.ARRANGE_TYPE = {
//	    	JUMP_GUIDE_LINE: 1,
//	    	SQUARE_3_5: 2,
//	    	SQUARE_7_2: 3,
//	    	HEART: 5,
//	    	A_PATTERN: 6,
//	    	F_PATTERN: 7
//	    };
//	    
	
	
	
	
//	path : [ 
//	{
//		// Path Variables
//		WALK_SPEED : 200,
//		JUMP : -700,
//		ACCEL_GROUND: 500,
//		ACCEL_AIR: 250,
//		
//		springPower: -1000,
//		
//		earthSpeed : -400,
//		blockSpeed : -400,
//		sinkSpeed: 0.5,
//		soarSpeed: 0.5,
//		vanishSpeed: 0.01,
//		itemSpeed : -400,
//		
//		shakeAmlitude: 0,
//		
//		path : [
//		    {
//		    	earth : { type : "LARGE", x : 0, y : -20, feature : "NORMAL" },
//		    	block : { type : "SMALL", x : 1200, y : -100, feature : "NORMAL" }, 
//		    	monster : { type : "MONSTER01", x : 2000, y : 100, feature : "NORMAL" },
//		    	item : { type : "JUMP_GUIDE_LINE", x : 1200, y : 250, feature : "NORMAL" }
//		    }
//		],
//		
//		
//		earth : [ 
//			{ type : "LARGE",  x : 0, y : -20, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
//			{ type : "LARGE", x : 0, y : -20, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y : -20, feature : "NORMAL" }, 
//			{ type : "LARGE",  x : 0, y : -20, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   20, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   20, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "VANISH" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y : 20, feature : "NORMAL" },
//			{ type : "MIDDLE", x : 0, y : 0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y : 0, feature : "VANISH" }, 
//			{ type : "SMALL",  x : 100, y : 0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   20, feature : "VANISH" },
//			{ type : "SMALL",  x : 0, y :   20, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y :   20, feature : "SOAR" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SOAR" },
//			{ type : "SMALL",  x : 200, y :   0, feature : "SOAR" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y : -90, feature : "SOAR" },
//			{ type : "MIDDLE", x : 0, y :  0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :  0, feature : "NORMAL" }, 
//			{ type : "SMALL",  x : 100, y : -60, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   -60, feature : "SINK" },
//			{ type : "SMALL",  x : 0, y :   -20, feature : "SOAR" },
//			
//
//				{ type : "LARGE",  x : 0, y :   0, feature : "VANISH" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y : 20, feature : "NORMAL" },
//			{ type : "MIDDLE", x : 0, y : 0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y : 0, feature : "VANISH" }, 
//			{ type : "SMALL",  x : 100, y : 0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   20, feature : "VANISH" },
//			{ type : "SMALL",  x : 0, y :   20, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y :   20, feature : "SOAR" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SOAR" },
//			{ type : "SMALL",  x : 200, y :   0, feature : "SOAR" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y : 120, feature : "SOAR" },
//			
//			{ type : "SMALL",  x : 0, y :   40, feature : "SOAR" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SOAR" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SOAR" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" }
//		],
//		block : [ 
//		    { type : "SMALL", x : 800, y : -200, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
//		    { type : "SMALL", x : 1200, y : -100, feature : "NORMAL" }, 
//		    { type : "SMALL", x : 1300,  y : 0, feature : "SOAR" },
//		    { type : "SMALL", x : 1700,  y : 0, feature : "NORMAL" }
//		    
//		],
//		monster : [
//		    { type : "MONSTER01", x : 2000, y : 100, feature : "NORMAL" },// feature { NORMAL, RAGEOUS }
//		    //{ type : "MONSTER01", x : 2400, y : 100, feature : "NORMAL" },
//		    //{ type : "MONSTER01", x : 2800, y : 100, feature : "NORMAL" },
//		    
//		    { type : "MONSTER01", x : 3800, y : 100, feature : "NORMAL" },
//		    { type : "MONSTER01", x : 4200, y : 100, feature : "NORMAL" },
//		   
//		    
//
//			
//		    { type : "MONSTER01", x : 4700, y : 100, feature : "NORMAL" },
//		  
//
//				 { type : "MONSTER01", x : 8100, y : 100, feature : "NORMAL" },
//		   
//		    { type : "MONSTER02", x : 10900, y : 100, feature : "NORMAL" },
//
//				
//		    { type : "MONSTER01", x : 12000, y : 100, feature : "NORMAL" },
//		    { type : "MONSTER01", x : 14000, y : 100, feature : "NORMAL" },
//			{ type : "MONSTER01", x : 16300, y : 100, feature : "NORMAL" },
//				{ type : "MONSTER01", x : 18000, y : 100, feature : "NORMAL" },
//		  
//
//				 { type : "MONSTER01", x : 20000, y : 100, feature : "NORMAL" },
//		   
//		    { type : "MONSTER02", x : 22100, y : 100, feature : "NORMAL" }
//
//		    //{ type : "MONSTER02", x : 800, y : 200, feature : "NORMAL" } 
//		],
//		item : [ 
//			//JUMP_GUIDE_LINE: 1,
//			//SQUARE_3_5: 2,
//			//SQUARE_7_2: 3,
//			//HEART: 5,
//			//A_PATTERN: 6,
//			//F_PATTERN: 7
//		    { type : "JUMP_GUIDE_LINE", x : 1200, y : 200, feature : "NORMAL" },// feature { NORMAL }
//		    { type : "JUMP_GUIDE_LINE", x : 1200, y : 250, feature : "NORMAL" },
//		    { type : "JUMP_GUIDE_LINE", x : 1200, y : 250, feature : "NORMAL" },
//				{ type : "SPRING", x : 2500, y : 100, feature : "NORMAL" },
//		    
//		    { type : "SQUARE_3_5", x : 2000, y : 250, feature : "NORMAL" },
//		    { type : "SQUARE_3_5", x : 2100, y : 250, feature : "NORMAL" },
//		    { type : "SQUARE_3_5", x : 2200, y : 250, feature : "NORMAL" },
//		    
//		    { type : "HEART", x : 3000, y : 250, feature : "NORMAL" },
//		    
//		    
//		    { type : "CAN_ITEM", x : 3500, y : 250, feature : "NORMAL" },
//		    { type : "CAN_ITEM", x : 3800, y : 250, feature : "NORMAL" },
//			{ type : "SPRING", x : 4200, y : 100, feature : "NORMAL" },
//				   { type : "SQUARE_3_5", x : 2000, y : 250, feature : "NORMAL" },
//		    { type : "SQUARE_3_5", x : 2100, y : 250, feature : "NORMAL" },
//		    { type : "SQUARE_3_5", x : 2200, y : 250, feature : "NORMAL" },
//		    
//		    
//		    
//		    { type : "CAN_ITEM", x : 3500, y : 250, feature : "NORMAL" },
//		    { type : "CAN_ITEM", x : 3800, y : 250, feature : "NORMAL" },
//
//		    
//		    { type : "JUMP_GUIDE_LINE", x : 1200, y : 300, feature : "NORMAL" },
//
//
//			
//				 { type : "SQUARE_3_5", x : 5100, y : 250, feature : "NORMAL" },
//		    { type : "SQUARE_3_5", x : 5700, y : 250, feature : "NORMAL" },
//		    { type : "SQUARE_3_5", x : 6000, y : 250, feature : "NORMAL" },
//			{ type : "SPRING", x : 6500, y : 100, feature : "NORMAL" },
//		    //{ type : "SQUARE_3_5", x : 500, y : 300, feature : "NORMAL" }
//		]
//	},
//	
//	{
//		earth : [ 
//			//{ test: null},
//			{ type : "SMALL",  x : 0, y : 20, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
//			{ type : "MIDDLE", x : 0, y : 0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y : 0, feature : "VANISH" }, 
//			{ type : "LARGE",  x : 100, y : 0, feature : "VANISH" },
//			{ type : "LARGE",  x : 0, y :   20, feature : "VANISH" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   10, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SOAR" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//					{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   -10, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SOAR" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//				{ type : "MIDDLE", x : 0, y :  0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :  0, feature : "NORMAL" }, 
//			{ type : "SMALL",  x : 100, y : 20, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   10, feature : "SINK" },
//				{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SOAR" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//				{ type : "MIDDLE", x : 0, y :  0, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :  0, feature : "NORMAL" }, 
//			{ type : "SMALL",  x : 100, y : 20, feature : "NORMAL" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "SMALL",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "SINK" },
//			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" }
//		],
//		block : [ 
//		    { type : "SMALL", x : 10, y : -100, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
//		    { type : "SMALL", x : 200, y : -150, feature : "VANISH" }, 
//		    { type : "SMALL", x : 5,  y : 0, feature : "SOAR" }
//		    
//		],
//		monster : [
//		    { type : "MONSTER01", x : 900, y : 100, feature : "NORMAL" },
//
//			{ type : "MONSTER01", x : 1200, y : 100, feature : "NORMAL" },
//
//				{ type : "MONSTER01", x : 1400, y : 100, feature : "NORMAL" },
//		    { type : "MONSTER01", x : 1800, y : 100, feature : "NORMAL" }
////		    { type : "MONSTER02", x : 800, y : 200, feature : "NORMAL" } 
//		],
//		item : [ 
//			//JUMP_GUIDE_LINE: 1,
//			//SQUARE_3_5: 2,
//			//SQUARE_7_2: 3,
//			//HEART: 5,
//			//A_PATTERN: 6,
//			//F_PATTERN: 7
//			//{ type : "SPRING", x : 600, y : 100, feature : "NORMAL" },
//		    { type : "SQUARE_3_5", x : 1200, y : 200, feature : "NORMAL" },// feature { NORMAL }
//		    { type : "SQUARE_3_5", x : 1300, y : 200, feature : "NORMAL" },
//		    { type : "SQUARE_3_5", x : 1400, y : 200, feature : "NORMAL" },
//		    { type : "SPRING", x : 1600, y : 100, feature : "NORMAL" },
//		    { type : "HEART", x : 2800, y : 250, feature : "NORMAL" },
//		    { type : "SQUARE_7_2", x : 3600, y : 250, feature : "NORMAL" },
//		    { type : "SQUARE_7_2", x : 3800, y : 250, feature : "NORMAL" },
//				{ type : "SPRING", x : 3900, y : 100, feature : "NORMAL" },
//		    { type : "SQUARE_7_2", x : 4000, y : 260, feature : "NORMAL" },
//		    { type : "SQUARE_7_2", x : 4000, y : 270, feature : "NORMAL" },
//		    { type : "SQUARE_7_2", x : 4000, y : 260, feature : "NORMAL" }
//		    //{ type : "SQUARE_3_5", x : 500, y : 300, feature : "NORMAL" }
//		]
//	}
////	
////	{
////		earth : [ 
////			{ type : "SMALL",  x : 0, y : 20, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
////			{ type : "MIDDLE", x : 0, y : 0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y : 0, feature : "NORMAL" }, 
////			{ type : "LARGE",  x : 100, y : 0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   20, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   20, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   60, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" }
////		],
////		block : [ 
////		    { type : "SMALL", x : 10, y : 0, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
////		    { type : "SMALL", x : 200, y : 0, feature : "NORMAL" }, 
////		    { type : "SMALL", x : 5,  y : 0, feature : "NORMAL" }
////		    
////		],
////		monster : [
////		    { type : "MONSTER01", x : 600, y : 100, feature : "NORMAL" },
////		    { type : "MONSTER01", x : 1000, y : 100, feature : "NORMAL" }
//////		    { type : "MONSTER02", x : 800, y : 200, feature : "NORMAL" } 
////		],
////		item : [ 
////			//JUMP_GUIDE_LINE: 1,
////			//SQUARE_3_5: 2,
////			//SQUARE_7_2: 3,
////			//HEART: 5,
////			//A_PATTERN: 6,
////			//F_PATTERN: 7
////		    { type : "SQUARE_3_5", x : 1200, y : 200, feature : "NORMAL" },// feature { NORMAL }
////		    { type : "SQUARE_3_5", x : 1200, y : 250, feature : "NORMAL" },
////		    { type : "SQUARE_3_5", x : 1200, y : 300, feature : "NORMAL" }
////		    //{ type : "SQUARE_3_5", x : 500, y : 300, feature : "NORMAL" }
////		]
////	} ,
////	
////	{
////		earth : [ 
////			{ type : "SMALL",  x : 0, y : 20, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
////			{ type : "MIDDLE", x : 0, y : 0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y : 0, feature : "NORMAL" }, 
////			{ type : "LARGE",  x : 100, y : 0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   20, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   20, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   60, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" },
////			{ type : "LARGE",  x : 0, y :   0, feature : "NORMAL" }
////		],
////		block : [ 
////		    { type : "SMALL", x : 10, y : 0, feature : "NORMAL" },// feature { NORMAL, VANISH, SINK, SOAR }
////		    { type : "SMALL", x : 200, y : 0, feature : "NORMAL" }, 
////		    { type : "SMALL", x : 5,  y : 0, feature : "NORMAL" }
////		    
////		],
////		monster : [
////		    { type : "MONSTER01", x : 600, y : 100, feature : "NORMAL" },
////		    { type : "MONSTER01", x : 1000, y : 100, feature : "NORMAL" }
//////		    { type : "MONSTER02", x : 800, y : 200, feature : "NORMAL" } 
////		],
////		item : [ 
////			//JUMP_GUIDE_LINE: 1,
////			//SQUARE_3_5: 2,
////			//SQUARE_7_2: 3,
////			//HEART: 5,
////			//A_PATTERN: 6,
////			//F_PATTERN: 7
////		    { type : "SQUARE_3_5", x : 1200, y : 200, feature : "NORMAL" },// feature { NORMAL }
////		    { type : "SQUARE_3_5", x : 1200, y : 250, feature : "NORMAL" },
////		    { type : "SQUARE_3_5", x : 1200, y : 300, feature : "NORMAL" }
////		    //{ type : "SQUARE_3_5", x : 500, y : 300, feature : "NORMAL" }
////		]
////	} 
//	]
};

});