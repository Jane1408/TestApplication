goog.provide("TestApplication.model.ShapeModel");


goog.scope(function(){
    /**
     * @constructor
     */
    TestApplication.model.ShapeModel = goog.defineClass(null, {
        constructor: function(type)
        {
            this._type = type;
            /**
             * @type {goog.math.Coordinate}
             */
            this._position = new goog.math.Coordinate(0, 0);
            this._size =new goog.math.Size(TestApplication.model.ShapeModel.SHAPE_WIDTH,
                TestApplication.model.ShapeModel.SHAPE_HEIGHT);
            this._key = goog.getUid(this);
        },
        
        /**
         * @param {goog.math.Coordinate} position
         */
        setPosition:function(position)
        {
            this._position = position;
        },
        
        /**
         * @param {goog.math.Size} size
         */
        setSize:function(size)
        {
            this._size = size;
        },

        /**
         * @returns {string}
         */
        getType:function()
        {
            return this._type;
        },

        /**
         * @returns {goog.math.Coordinate}
         */
        getPosition:function()
        {
            return this._position;
        },

        /**
         * @returns {goog.math.Size}
         */
        getSize:function()
        {
            return this._size;
        },

        /**
         * @returns {number}
         */
        getKey: function()
        {
            return this._key;
        },

        statics:
        {
            /* @type {number}*/
            SHAPE_WIDTH: 100,
            /* @type {number}*/
            SHAPE_HEIGHT: 100,
        }
    });
});