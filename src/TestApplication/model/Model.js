goog.provide("TestApplication.model.Model");

goog.scope(function () {
    /**
     * @constructor
     */
    TestApplication.model.Model = goog.defineClass(null, {
        constructor: function () {
            /**@private {Array<TestApplication.model.ShapeModel>}*/
            this._data = [];
        },

        /**
         * @param {TestApplication.model.ShapeModel} shape
         */
        addShape: function (shape) {
            if (shape.getLayerId() != -1) {
                goog.array.insertAt(this._data, shape, shape.getLayerId());
            }
            else {
                goog.array.insert(this._data, shape);
            }
        },

        /**
         * @param {TestApplication.model.ShapeModel} shape
         */
        removeShape: function (shape) {
            for (var i = 0; i != this._data.length; ++i) {
                if (shape == this._data[i]) {
                    shape.setLayerId(i);
                    this._data.splice(i--, 1);
                    break;
                }
            }
        },

        /**
         * @param {number} key
         * @return {?TestApplication.model.ShapeModel}
         */
        getShapeByKey: function (key) {
            for (var i = 0; i != this._data.length; ++i) {
                if (key == this._data[i].getKey()) {
                    return this._data[i];
                }
            }
            return null;
        },

        /**
         * @return {Array<TestApplication.model.ShapeModel>}
         */
        getData: function () {
            return this._data;
        },

        removeData: function () {
            goog.array.clear(this._data);
        },

    })
});