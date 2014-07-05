ig.module(
	'game.entities.earth'
)
.requires(
	'impact.entity'
)
.defines(function () {
	
	EntityEarth = ig.Entity.extend({
		
		_init: null,
		_update: null,
		_destroy: null,
		_sleep: true,
		
		maxVel: { x: 10000, y: 10000 },
		
		init: function(x, y, settings){
			this.parent(x, y, settings);
			
			if (this._init != null) this._init();
		},
		
		update: function () {
			this.parent();
			
			if (this._sleep) return;
			
			if (this._update != null) this._update();
			
			this.checkReturnToPool();
		},
		
		checkReturnToPool: function () {
			if (this.pos.x < -1000) {
        		EM.returnToPool(this);
        	}
		}
    });
});
