goog.provide("TestApplication.view.ResizePoint");

goog.require("TestApplication.Constants");

goog.scope(function () {
    const Constants = TestApplication.Constants;
    /**
     * @constructor
     * @param {string} className
     */
    TestApplication.view.ResizePoint = goog.defineClass(null, {
        constructor: function (className) {
            this._createPoint(className);

            /**@private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(0, 0);

            /**@private {goog.math.Size}*/
            this._size = new goog.math.Size(0, 0);

        },

        /**
         * @private
         */
        _createPoint: function (className) {
            /** @type {Element}*/
            this._point = goog.dom.createElement(goog.dom.TagName.DIV);
            this._point.setAttribute("class", "point");
            this._point.classList.add(className);

        },

        /**
         * @return {Element}
         */
        getObject: function () {
            return this._point;
        },

        /**
         * @return {boolean}
         */
        _hitTest: function (clickPos, pointPos) {
            return ((pointPos.x <= clickPos.x && clickPos.x <= pointPos.x + Constants.RESIZE_POINT_RADIUS * 2) &&
            (pointPos.y <= clickPos.y && clickPos.y <= pointPos.y + Constants.RESIZE_POINT_RADIUS * 2));

        },
    })
});