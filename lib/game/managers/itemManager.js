ig.module(
	'game.manager.itemManager'
)
.requires(
	'game.entities.item'
)
.defines(function () {

    //////////////////////////////////////////////////////////////
    //
    //  게임에서 필요한 아이템 관련 사항 생성 및 관리
    //
    //////////////////////////////////////////////////////////////
    ItemManager = ig.Class.extend({

        timer: null,
        map: {
            item0: [],
            item1: [],
            item2: [],
            item3: []
        },

        staticInstantiate: function () {
            if (ItemManager.instance == null) {
                return null;
            }
            else {
                return ItemManager.instance;
            }
        },

        init: function () {
            this.timer = new ig.Timer(GM.itemSpeed);
            ItemManager.instance = this;

        },

        generate: function (TYPE, x, y, _settings) {
            
        },

        update: function () {

           
        },

        _blockSelector: function () {
            

        },

        _choosePos: function (axis, blockType) {
        
        },

        getFromPool: function (type, x, y) {
            
        },

        returnToPool: function (item) {
            
        }
    });
    
    ItemManager.instance = null;
    
    ItemManager.TYPE = {
        HEART: 0,
        COIN: 1,
        JUMP: 2,
        SUPER_JUMP: 3
    };

    ItemManager.getTypeLength = function () {
        var count = 0;
        for (var i in ItemManager.TYPE)
            count++;
        return count;
    };
});
