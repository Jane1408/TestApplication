goog.provide("TestApplication.model.ShapeModel");

goog.require("TestApplication.Constants");

goog.scope(function() {
    const CONST = TestApplication.Constants;
    /**
     * @constructor
     * @param {string} type
     */
    TestApplication.model.ShapeModel = goog.defineClass(null, {
        constructor: function (type) {
            /** @private {string}*/
            this._type = type;
            /** @private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(CONST.SHAPE_START_POSITION_X, CONST.SHAPE_START_POSITION_Y);
            /** @private {goog.math.Size}*/
            this._size = new goog.math.Size(CONST.SHAPE_START_WIDTH, CONST.SHAPE_START_HEIGHT);
            /** @private {number}*/
            this._key = goog.getUid(this);
            /** @private {number}*/
            this._layerId = -1;

        },

        /**
         * @param {goog.math.Coordinate} position
         */
        setPosition: function (position) {
            this._position = position;
        },

        /**
         * @param {goog.math.Size} size
         */
        setSize: function (size) {
            this._size = size;
        },

        /**
         * @param {number} id
         */
        setLayerId: function (id) {
            this._layerId = id;
        },

        /**
         * @returns {string}
         */
        getType: function () {
            return this._type;
        },

        /**
         * @returns {goog.math.Coordinate}
         */
        getPosition: function () {
            return this._position;
        },

        /**
         * @returns {goog.math.Size}
         */
        getSize: function () {
            return this._size;
        },

        /**
         * @returns {number}
         */
        getKey: function () {
            return this._key;
        },
        /**
         * @returns {number}
         */
        getLayerId: function () {
            return this._layerId;
        }

    });
});