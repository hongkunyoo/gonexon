ig.module(
	'game.entities.myEntity'
)
.requires(
	'impact.impact',
	'impact.entity'
)
.defines(function () {
	
	EntityMyEntity = ig.Entity.extend({
		
		_init: null,
		_update: null,
		_destroy: null,
		_sleep: true,

        init: function (x, y, settings) {
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
        		PM.returnToPool(this);
        	}
        	
        }
    });
});
