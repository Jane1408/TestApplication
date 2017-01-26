goog.provide("TestApplication.model.Model");

goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.model.Model = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {Array<TestApplication.model.ShapeModel>}*/
            this._data = [];
        },
        
        /**
         * @param {TestApplication.model.ShapeModel} shape
         */
        addShape:function(shape)
        {
            shape.setPosition( new goog.math.Coordinate(TestApplication.model.Model.CENTER_X, TestApplication.model.Model.CENTER_Y));
            goog.array.insert(this._data, shape);
            
        },

        /**
         * @param {TestApplication.model.ShapeModel} shape
         */
        removeShape:function(shape)
        {
            for (var i = 0; i != this._data.length; ++i)
            {
                if (shape == this._data[i])
                {
                    this._data.splice(i--, 1);
                    break;
                }
            }
        },

        getShapeKey: function(detail)
        {
            for(var i = this._data.length - 1; i >= 0; --i)
            {
                var position = this._data[i].getPosition();
                var size = this._data[i].getSize();

                if ((position.x <= detail.pageX && detail.pageX <= position.x + size.width) &&
                    position.y<= detail.pageY - TestApplication.model.Model.TOOLBAR_OFFSET &&
                    detail.pageY - TestApplication.model.Model.TOOLBAR_OFFSET <= position.y + size.height)
                {
                    return this._data[i].getKey();
                }
            }
            return 0;
        },

        getShapeByKey: function(key)
        {
            for(var i = 0; i != this._data.length; ++i)
            {
                if ( key == this._data[i].getKey())
                {
                    return this._data[i];
                }
            }
            return null;
        },

        statics:
        {
            CENTER_X: 270,
            CENTER_Y: 190,
            TOOLBAR_OFFSET: 55,
        }
    })
});