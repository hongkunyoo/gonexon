ig.module(
	'game.managers.eventManager'
)
.requires(
	//'game.entities.earth',
	//'game.managers.gameManager'
)
.defines(function () {
	EventManager = ig.Class.extend({
		 	
			map: {},
	    
	        staticInstantiate: function () {
	            if (EventManager.instance == null) {
	                return null;
	            }
	            else {
	                return EventManager.instance;
	            }
	        },
	       
	        init: function () {
	        	EventManager.instance = this;
	        },
	      
	        update: function () {
	        	
	        },
	        
	        addEvent: function(eventName, func){
	        	if(this.map[eventName] == undefined)
	        		this.map[eventName] = [];
	        	
	        	this.map[eventName].push(func);
	        },
	        
	        notify: function(eventName){
	        	for(var i = 0 ; i < this.map[eventName].length ; i++){
	        		this.map[eventName][i]();
	        	}
	        }

	    });
	    
	    EventManager.instance = null;
	});

