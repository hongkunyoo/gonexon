ig.module(
	'game.ui.uiMessage'
)
.requires(
	'impact.entity',
	'impact.font'
)
.defines(function () {

    EntityUiMessage = ig.Entity.extend({
    
    	//animSheet: new ig.AnimationSheet( 'media/heart_small.png', 100, 100 ),  
		size : {x: 40, y: 40},
		//maxVel: {x: 0, y: 0},
		vel: {x: 0, y: -300},
		gravityFactor : 0,
		font: new ig.Font("media/04b03.font.png"),
		collides: ig.Entity.COLLIDES.NEVER,
		message : null,
		
		init: function (x, y, settings) {
            
            this.parent(x, y, settings);
            console.log('INIT MESSAGE!!');
            //this.addAnim('idle',1,[0]);
        },
        
        update: function() {
        	this.parent();
        	
//        	if(this.)
//        		this.kill();
        	// if this entity if out of screen
        	// then this.kill();
        },
        
        onDeath: function(){
        	console.log('I\'m killed@');
        },
        
        draw: function(){
        	if(this.message != null)
        		this.font.draw(this.message, this.pos.x, this.pos.y);
        }
       
    });
});
