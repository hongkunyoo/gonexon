+	ig.module( 
+		'game.main' 
+	)
+	.requires(
+		'impact.game',
+		'impact.font',
+		'impact.debug.debug',
+		'game.entities.MyEntity'
+	)
+	.defines(function(){
+	
+	MyGame = ig.Game.extend({
+		
+		// Load a font
+		font: new ig.Font( 'media/04b03.font.png' ),
+		
+		init: function() {
+			// Initialize your game here; bind keys etc.
+			//var settings = {health: 100, vel: {x: 200, y: 100}};
+			var settings = {};
+			ig.game.spawnEntity( EntityPlayer, 10, 10, settings );
+		},
+		
+		update: function() {
+			// Update all entities and backgroundMaps
+			this.parent();
+			// Add your own, additional update code here
+		},
+		
+		draw: function() {
+			// Draw all entities and backgroundMaps
+			this.parent();
+			
+			
+			// Add your own drawing code here
+			var x = ig.system.width/2,
+				y = ig.system.height/2;
+			
+			this.font.draw( 'd!!!', x, y, ig.Font.ALIGN.CENTER );
+		}
+	});
+	
+	
+	// Start the Game with 60fps, a resolution of 320x240, scaled
+	// up by a factor of 2
+	ig.main( '#canvas', MyGame, 60, 320, 240, 2 );
+	
+	});
 	
