

ig.module( 'game.levels.level01' )
.requires(
	//'game.managers.earthManager'
)
.defines(function(){

LEVEL01 = {
	bg: "",
	playerSpeed: 0,
	earthSpeed: 0,
	level: "LEVEL01",
	
	path: [
	{
		earth : 
			[
     	     { type : 0, x : 0, y : -20, feature: "NORMAL" },
     	     { type : 1, x : 0, y : -20, feature: "NORMAL" },
     	     { type : 2, x : 0, y : -20, feature: "NORMAL" }
     	    ],
	    block : 
	    	[
              { type : 0, x : 10, y : 0 },
              { type : 0, x : 50, y : 0 },
              { type : 0, x : 5, y : 0 }
            ],
	    monster : 
	    	[
	    	],
	    item : 
	    	[
	        ]
	},
	
	{
		earth : 
			[
				{ type : 0, x : 0, y : -20, feature: "NORMAL" },
				{ type : 0, x : 5, y : -20, feature: "NORMAL" },
				{ type : 1, x : 5, y : -20, feature: "NORMAL" }
         	],
	    block : 
	    	[
             	{ type : 0, x : 10, y : 0 },
             	{ type : 0, x : 10, y : 0 }
	        ],
	    monster : 
	    	[],
	    item : 
	    	[]
	},
	
	{
		earth : 
			[
				{ type : 0, x : 0, y : 0, feature: "NORMAL" },
				{ type : 0, x : 0, y : 0, feature: "NORMAL" },
				{ type : 1, x : 0, y : 0, feature: "NORMAL" }
         	],
	    block : 
	    	[
             	{ type : 0, x : 15, y : -20 },
             	{ type : 0, x : 15, y : -10 }
	        ],
	    monster : 
	    	[],
	    item : 
	    	[]
	},
	
	{
		earth : 
			[
				{ type : 0, x : 0, y : 0, feature: "NORMAL" },
				{ type : 0, x : 0, y : 0, feature: "NORMAL" },
				{ type : 1, x : 0, y : 0, feature: "NORMAL" }
         	],
	    block : 
	    	[
             	{ type : 0, x : 10, y : -20 },
             	{ type : 0, x : 5, y : -10 }
	        ],
	    monster : 
	    	[],
	    item : 
	    	[]
	},
	{
		earth : 
			[
				{ type : 0, x : 0, y : 50, feature: "NORMAL" },
				{ type : 0, x : 0, y : 20, feature: "NORMAL" },
				{ type : 1, x : 0, y : 0, feature: "NORMAL" }
         	],
	    block : 
	    	[
             	{ type : 0, x : 15, y : -20 },
             	{ type : 0, x : 10, y : -10 }
	        ],
	    monster : 
	    	[],
	    item : 
	    	[]
	},
	{
		earth : 
			[
				{ type : 0, x : 0, y : 10, feature: "NORMAL" },
				{ type : 0, x : 0, y : 0, feature: "NORMAL" },
				{ type : 1, x : 0, y : 0, feature: "NORMAL" }
         	],
	    block : 
	    	[
             	{ type : 0, x : 15, y : -20 },
             	{ type : 0, x : 16, y : -10 }
	        ],
	    monster : 
	    	[],
	    item : 
	    	[]
	},
	{
		earth : 
			[
				{ type : 0, x : 0, y : 0, feature: "NORMAL" },
				{ type : 0, x : 0, y : 0, feature: "NORMAL" },
				{ type : 1, x : 0, y : 0, feature: "NORMAL" }
         	],
	    block : 
	    	[
             	{ type : 0, x : 10, y : 40 },
             	{ type : 0, x : 10, y : -10 }
	        ],
	    monster : 
	    	[],
	    item : 
	    	[]
	}
	          
 ]
};	

});