goog.provide("TestApplication.model.ShapeModel");


goog.scope(function(){
    /**
     * @constructor
     */
    TestApplication.model.ShapeModel = goog.defineClass(null, {
        constructor: function(type)
        {
            this._type = type;
            this._position = new goog.math.Coordinate(TestApplication.model.ShapeModel.POS_X,
                TestApplication.model.ShapeModel.POS_Y);
            this._size =new goog.math.Size(TestApplication.model.ShapeModel.SHAPE_WIDTH,
                TestApplication.model.ShapeModel.SHAPE_HEIGHT);
        },
        /**
         * @public
         * @param position {goog.math.Coordinate}
         */
        setPosition:function(position)
        {
            this._position = position;
        },
        /**
         * @public
         * @param size
         */
        setSize:function(size)
        {
            this._size = size;
        },

        /**
         * @public
         * @returns {string}
         */
        getType:function()
        {
            return this._type;
        },

        /**
         * @public
         * @returns {goog.math.Coordinate}
         */
        getPosition:function()
        {
            return this._position;
        },

        /**
         * @public
         * @returns {goog.math.Size|*|number}
         */
        getSize:function()
        {
            return this._size;
        },

        statics:
        {
            SHAPE_WIDTH: 100,
            SHAPE_HEIGHT: 100,
            POS_X: document.documentElement.clientWidth/2,
            POS_Y: document.documentElement.clientHeight/2
        }
    });
});