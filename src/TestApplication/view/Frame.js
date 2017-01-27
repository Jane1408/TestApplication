goog.provide("TestApplication.view.Frame");

goog.require("goog.math");
goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.view.Frame = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(0, 0);

            /**@private {goog.math.Size}*/
            this._size = new goog.math.Size(0, 0);

            /**@private {boolean}*/
            this._isActive = false;

            this._frame = goog.dom.createElement(goog.dom.TagName.DIV);
            this._frame.setAttribute("class", "frame");

            this._points = [];
            this._createResizePoints();
        },
        
        setShape: function(shape)
        {
            this._position = shape.getPosition();
            this._size = shape.getSize();
            goog.style.setPosition(this._frame, shape.getPosition());
            goog.style.setSize(this._frame, shape.getSize());
            this.setPositionOfPoints(this._size);
            this._isActive = true;
        },
        
        setPosition: function(pos)
        {
            this._position = pos;
            goog.style.setPosition(this._frame, pos);
        //    this.setPositionOfPoints(this._size);
        },
        
        isActive: function()
        {
            return this._isActive;
        },
        
        getObject: function()
        {
            return this._frame;
        },

        _createResizePoints: function()
        {
            for (var i = 0; i < 4 ; ++i)
            {
                var point = goog.dom.createElement(goog.dom.TagName.DIV);
                point.setAttribute("class", "frame-point");
                this._frame.appendChild(point);
                this._points.push(point);
            }
        },

        setPositionOfPoints:function(size)
        {
            goog.style.setPosition(this._points[0], new goog.math.Coordinate(TestApplication.view.Frame.POINT_OFFSET,
                TestApplication.view.Frame.POINT_OFFSET));
            goog.style.setPosition(this._points[1], new goog.math.Coordinate(size.width + TestApplication.view.Frame.POINT_OFFSET,
                TestApplication.view.Frame.POINT_OFFSET));
            goog.style.setPosition(this._points[2], new goog.math.Coordinate(size.width + TestApplication.view.Frame.POINT_OFFSET,
                size.height + TestApplication.view.Frame.POINT_OFFSET));
            goog.style.setPosition(this._points[3], new goog.math.Coordinate(TestApplication.view.Frame.POINT_OFFSET,
                size.height + TestApplication.view.Frame.POINT_OFFSET));

        },

        checkPoints: function(pos)
        {
            var clickPos = new goog.math.Coordinate(pos.x - this._position.x, pos.y - this._position.y);

            for (var i = 0; i < this._points.length; i++)
            {
                var pointPos = goog.style.getPosition(this._points[i]);
                console.log(i + " point hitTest is  " + this._hitTest(clickPos, pointPos));
            }
            //TODO: return this._hitTest(clickPos, pointPos) + add resize command
            return false;
        },

        _hitTest: function(clickPos, pointPos) {

            var radius = new goog.math.Coordinate(5, 5);
            var origin = new goog.math.Coordinate(pointPos.x + radius.x, pointPos.y + radius.y);
            var pointLocalPos = new goog.math.Coordinate(clickPos.x - origin.x, clickPos.y - origin.y);

            return (((Math.pow(pointLocalPos.x, 2) / Math.pow(radius.x, 2)) + (Math.pow(pointLocalPos.y, 2) / Math.pow(radius.y, 2))) <= 1);
        },

        statics: {
            FRAME_OFFSET: -1,
            POINT_OFFSET: -5,

        }


    })
});