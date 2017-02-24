goog.provide("TestApplication.view.ShapeView");

goog.require("goog.math");
goog.scope(function () {
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} model
     */
    TestApplication.view.ShapeView = goog.defineClass(null, {
        constructor: function (model) {
            /**@private {TestApplication.model.ShapeModel}*/
            this._model = model;
        },

        /**
         * @virtual
         * @param {goog.math.Coordinate} clickPos
         * @returns {boolean}
         */
        hitTest: function (clickPos) {
        },

        /**
         * @virtual
         * @returns {Element}
         */
        getElement: function () {
        },

        /**
         * @virtual
         */
        redraw: function () {
        },

        /**
         * @virtual
         * @param {goog.math.Coordinate} pos
         */
        move: function (pos) {
        },

        /**
         * @virtual
         * @param {goog.math.Size} size
         */
        resize: function (size) {
        },

        /**
         * @returns {number}
         */
        getId: function () {
            return this._model.getId();
        },

        /**
         * @returns {goog.math.Coordinate}
         */
        getPosition: function () {
            return this._model.getPosition();
        },

        /**
         * @returns {goog.math.Size}
         */
        getSize: function () {
            return this._model.getSize();
        },

        /**
         * @returns {number}
         */
        getLevel: function () {
            return this._model.getLevel();
        }
    })
});