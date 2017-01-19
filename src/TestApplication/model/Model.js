goog.provide("TestApplication.model.Model");

goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.model.Model = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {Array}*/
            this._data = [];
        },


        addShape:function(shape)
        {
            goog.array.insert(this._data, shape);
        },

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
    })
});