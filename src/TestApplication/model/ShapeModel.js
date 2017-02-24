goog.provide("TestApplication.model.ShapeModel");

goog.require("TestApplication.Constants");

goog.scope(function () {
    const Constants = TestApplication.Constants;
    /**
     * @constructor
     * @param {string} type
     */
    TestApplication.model.ShapeModel = goog.defineClass(null, {
        constructor: function (type) {
            /** @private {string}*/
            this._type = type;
            /** @private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(Constants.SHAPE_START_POSITION_X, Constants.SHAPE_START_POSITION_Y);
            /** @private {goog.math.Size}*/
            this._size = new goog.math.Size(Constants.SHAPE_START_WIDTH, Constants.SHAPE_START_HEIGHT);
            /** @private {number}*/
            this._id = goog.getUid(this);
            /** @private {number}*/
            this._level = -1;
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
         * @param {number} level
         */
        setLevel: function (level) {
            this._level = level;
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
        getId: function () {
            return this._id;
        },
        /**
         * @returns {number}
         */
        getLevel: function () {
            return this._level;
        }
    });
});