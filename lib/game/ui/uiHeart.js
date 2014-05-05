ig.module(
	'game.ui.uiHeart'
)
.requires(
	'impact.entity',
	'impact.font'
)
.defines(function () {

    EntityuiHeart = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/heart_small.png', 20, 20 ),  
	size : {x: 20, y: 20},
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
