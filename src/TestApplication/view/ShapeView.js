goog.provide("TestApplication.view.ShapeView");

goog.require("goog.math");
goog.scope(function()
{
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} model
     */
    TestApplication.view.ShapeView = goog.defineClass(null, {
        constructor:function(model)
        {
            /**@private {TestApplication.model.ShapeModel}*/
            this._model = model;
        },

        /**
         * @returns {number}
         */
        getKey: function()
        {
            return this._model.getKey();
        },
        
        /**
         * @returns {goog.math.Coordinate}
         */
        getPosition: function()
        {
            return this._model.getPosition();
        },

        /**
         * @returns {goog.math.Size}
         */
        getSize: function()
        {
            return this._model.getSize();
        },

    })
});