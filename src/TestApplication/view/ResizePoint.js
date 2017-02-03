goog.provide("TestApplication.view.ResizePoint");

goog.require("TestApplication.Constants");

goog.scope(function()
{
    const CONST = TestApplication.Constants;
    /**
     * @constructor
     */
    TestApplication.view.ResizePoint = goog.defineClass(null, {
        constructor:function()
        {
            this._createPoint();

            /**@private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(0, 0);

            /**@private {goog.math.Size}*/
            this._size = new goog.math.Size(0, 0);

        },

        /**
        * @private
        */
        _createPoint: function() {
            /** @type {Element}*/
            this._point = goog.dom.createElement(goog.dom.TagName.DIV);
            this._point.setAttribute("class", "frame-point");
        },

        /**
        * @return {Element}
        */
        getObject: function()
        {
            return this._point;
        },

        /**
        * @return {boolean}
        */
        _hitTest: function(clickPos, pointPos) {

            var radius = CONST.RESIZE_POINT_RADIUS;
            var origin = new goog.math.Coordinate(pointPos.x + radius, pointPos.y + radius);
            var pointLocalPos = new goog.math.Coordinate(clickPos.x - origin.x, clickPos.y - origin.y);

            return (((Math.pow(pointLocalPos.x, 2) / Math.pow(radius, 2)) + (Math.pow(pointLocalPos.y, 2) / Math.pow(radius, 2))) <= 1);
        },
    })
});