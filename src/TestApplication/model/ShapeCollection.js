goog.provide("TestApplication.model.ShapeCollection");

goog.scope(function () {
    /**
     * @constructor
     */
    TestApplication.model.ShapeCollection = goog.defineClass(null, {
        constructor: function () {
            /**@private {Array<TestApplication.model.ShapeModel>}*/
            this._shapesModel  = [];
        },

        /**
         * @param {TestApplication.model.ShapeModel} shape
         */
        addShape: function (shape) {
            if (shape.getLevel() != -1) {
                goog.array.insertAt(this._shapesModel, shape, shape.getLevel());
            }
            else {
                goog.array.insert(this._shapesModel, shape);
            }
        },

        /**
         * @param {TestApplication.model.ShapeModel} shape
         */
        removeShape: function (shape) {
            for (var i = 0; i != this._shapesModel.length; ++i) {
                if (shape == this._shapesModel[i]) {
                    shape.setLevel(i);
                    this._shapesModel.splice(i--, 1);
                    break;
                }
            }
        },

        /**
         * @param {number} id
         * @return {?TestApplication.model.ShapeModel}
         */
        getShapeById: function (id) {
            for (var i = 0; i != this._shapesModel.length; ++i) {
                if (id == this._shapesModel[i].getId()) {
                    return this._shapesModel[i];
                }
            }
            return null;
        },

        /**
         * @return {Array<TestApplication.model.ShapeModel>}
         */
        getShapesModel: function () {
            return this._shapesModel;
        },

        removeShapesModel: function () {
            goog.array.clear(this._shapesModel);
        }
    })
});