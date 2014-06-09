ig.module( 'game.levels.basic' )
.requires('impact.image')
.defines(function(){
LevelBasic=/*JSON[*/{"entities":[],
	
	"layer":[
		{
			"name":"background",
			"width":120,
			"height":60,
			"linkWithCollision":false,
			"visible":1,
			"tilesetName":"media/background.png",
			"repeat":false,
			"preRender":false,
			"distance":"1",
			"tilesize":450,
			"foreground":false,
			"data":[[1]]
		}
	]
}/*]JSON*/;
LevelBasic2=/*JSON[*/{"entities":[],

"layer":[
	{
		"name":"background",
		"width":1,
		"height":1,
		"linkWithCollision":false,
		"visible":1,
		"tilesetName":"media/background2.png",
		"repeat":false,
		"preRender":false,
		"distance":"1",
		"tilesize":600,
		"foreground":false,
		"data":[[1]]
	}
]
};
LevelBasicResources=[new ig.Image('media/background.png')];
});