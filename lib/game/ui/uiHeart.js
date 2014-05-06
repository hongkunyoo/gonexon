ig.module(
	'game.ui.uiHeart'
)
.requires(
	'impact.entity',
	'impact.font'
)
.defines(function () {

    EntityuiHeart = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/heart_small.png', 100, 100 ),  
	size : {x: 40, y: 40},
	maxVel: {x: 0, y: 0},
	vel: {x: 0, y: 0},
	font: new ig.Font("media/04b03.font.png"),
	   	
		init: function (x, y, settings) {
            
            this.parent(x, y, settings);
            
            this.addAnim('idle',1,[0]);
        },
        
        update: function() {
        	this.parent();
        }
        
   
       
    });
});
