ig.module(
	'game.entities.earth'
)
.requires(
	'impact.impact',
	'impact.entity',
	'game.entities.myEntity'
)
.defines(function () {
	
	EntityEarth = EntityMyEntity.extend({
		
		init: function(x, y, settings){
			this.parent(x, y, settings);
		},
		
		update: function () {
			this.parent();
		}
    });
});
