goog.provide("TestApplication.view.Frame");

goog.require("TestApplication.view.ResizePoint");
goog.require("TestApplication.Constants");

goog.scope(function () {
    const Constants = TestApplication.Constants;
    /**
     * @constructor
     */
    TestApplication.view.Frame = goog.defineClass(null, {
        constructor: function () {
            this._createFrame();

            /**@private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(0, 0);

            /**@private {goog.math.Size}*/
            this._size = new goog.math.Size(0, 0);

            /**@private {boolean}*/
            this._isActive = false;

            /**@private {Array<TestApplication.view.ResizePoint>}*/
            this._points = [];
            this._createResizePoints();

            /**@private {number}*/
            this._activePointId = -1;

            /**@private {TestApplication.view.ShapeView}*/
            this._shape = null;
        },

        /**
         * @param {TestApplication.view.ShapeView} shape
         */
        setShape: function (shape) {
            this._shape = shape;
            this._setPosition(shape.getPosition());
            this._setSize(shape.getSize());
            this._isActive = true;
        },

        /**
         * @param {goog.math.Coordinate} pos
         */
        move: function (pos) {
            pos = this._transferMouseCoordinateToCanvasArea(pos);
            pos = this._calculateCorrectShapePositionForMoving(pos);
            this._setPosition(pos);
            this._shape.move(this._position);
        },

        /**
         * @param {goog.math.Coordinate} pos
         */
        resize: function (pos) {
            var newSize = new goog.math.Size(0, 0);
            var newPos = new goog.math.Coordinate(0, 0);
            pos = this._transferMouseCoordinateToCanvasArea(pos);
            switch (this._activePointId) {
                case 0:
                {
                    newPos = pos;
                    newPos.x = this._calculateCorrectXPosWithShapeMinWidth(newPos.x);
                    newPos.y = this._calculateCorrectYPosWithShapeMinHeight(newPos.y);
                    newSize = new goog.math.Size(this._position.x + this._size.width - pos.x,
                        this._position.y + this._size.height - pos.y);
                    break;
                }
                case 1:
                {
                    newPos = new goog.math.Coordinate(this._position.x, pos.y);
                    newPos.y = this._calculateCorrectYPosWithShapeMinHeight(newPos.y);
                    newSize = new goog.math.Size(pos.x - this._position.x, this._position.y + this._size.height - pos.y);
                    break;
                }
                case 2:
                {
                    newPos = this._position;
                    newSize = new goog.math.Size(pos.x - this._position.x, pos.y - this._position.y);
                    break;
                }
                case 3:
                {
                    newPos = new goog.math.Coordinate(pos.x, this._position.y);
                    newPos.x = this._calculateCorrectXPosWithShapeMinWidth(newPos.x);
                    newSize = new goog.math.Size(this._position.x + this._size.width - pos.x, pos.y - this._position.y);
                    break;
                }
                default:
                    return;
            }
            this._position = this._calculateCorrectShapePositionForResizing(newPos);
            this._size = this._calculateCorrectSize(newSize, this._position);
            this.move(this._position);
            this._setSize(this._size);
            this._shape.resize(this._size);
        },

        /**
         * @returns {boolean}
         */
        isActive: function () {
            return this._isActive;
        },

        deactivate: function () {
            this._isActive = false;
        },

        /**
         * @return {Element}
         */
        getElement: function () {
            return this._frame;
        },
        
        /**
         * @param {goog.math.Coordinate} pos
         * @return {boolean}
         */
        checkPoints: function (pos) {
            var clickPos = new goog.math.Coordinate(pos.x - this.getPosition().x, pos.y - this.getPosition().y);
            for (var i = 0; i < this._points.length; i++) {
                var pointPos = goog.style.getPosition(this._points[i].getObject());
                if (this._points[i]._hitTest(clickPos, pointPos)) {
                    var style = (i == 0 || i == 2) ? "nw-resize" : "ne-resize";
                    goog.style.setStyle(document.documentElement, "cursor", style);
                    this._activePointId = i;
                    return true;
                }
            }
            return false;
        },

        /**
         * @return {goog.math.Size}
         */
        getSize: function () {
            return this._size;
        },

        /**
         * @return {goog.math.Coordinate}
         */
        getPosition: function () {
            return this._position;
        },

        /**
         * @private
         */
        _createFrame: function () {
            /** @private {Element}*/
            this._frame = goog.dom.createElement(goog.dom.TagName.DIV);
            this._frame.setAttribute("class", "frame");
        },

        /**
         * @param {goog.math.Coordinate} pos
         * @private
         */
        _setPosition: function (pos) {
            this._position = pos;
            goog.style.setPosition(this._frame, this._position);
        },

        /**
         * @param {goog.math.Size} size
         * @private
         */
        _setSize: function (size) {
            this._size = size;
            goog.style.setSize(this._frame, this._size);
            this._setPositionOfPoints(this._size);
        },

        /**
         * @param {goog.math.Size} newSize
         * @param {goog.math.Coordinate} pos
         * @returns {goog.math.Size}
         * @private
         */
        _calculateCorrectSize: function (newSize, pos) {
            newSize.width = (newSize.width <= Constants.MIN_SHAPE_WIDTH) ? Constants.MIN_SHAPE_WIDTH : newSize.width;
            newSize.width = (newSize.width >= Constants.MAX_SHAPE_WIDTH) ? Constants.MAX_SHAPE_WIDTH : newSize.width;
            newSize.width = (newSize.width >= Constants.CANVAS_WIDTH - pos.x) ? Constants.CANVAS_WIDTH - pos.x : newSize.width;
            newSize.height = (newSize.height <= Constants.MIN_SHAPE_HEIGHT) ? Constants.MIN_SHAPE_HEIGHT : newSize.height;
            newSize.height = (newSize.height >= Constants.MAX_SHAPE_HEIGHT) ? Constants.MAX_SHAPE_HEIGHT : newSize.height;
            newSize.height = (newSize.height >= Constants.CANVAS_HEIGHT - pos.y) ? Constants.CANVAS_HEIGHT - pos.y : newSize.height;
            return newSize;
        },

        /**
         * @param {goog.math.Coordinate} pos
         * @returns {goog.math.Coordinate}
         * @private
         */
        _transferMouseCoordinateToCanvasArea: function (pos) {
            pos.x = (pos.x < 0) ? 0 : pos.x;
            pos.y = (pos.y < 0) ? 0 : pos.y;
            pos.x = (pos.x >= Constants.CANVAS_WIDTH) ? Constants.CANVAS_WIDTH : pos.x;
            pos.y = (pos.y >= Constants.CANVAS_HEIGHT) ? Constants.CANVAS_HEIGHT : pos.y;
            return pos;
        },

        /**
         * @param {goog.math.Coordinate} pos
         * @returns {goog.math.Coordinate}
         * @private
         */
        _calculateCorrectShapePositionForMoving: function (pos) {
            pos.x = (Math.abs(pos.x + this._size.width) > Constants.CANVAS_WIDTH)
                ? Constants.CANVAS_WIDTH - this._size.width : pos.x;
            pos.y = (Math.abs(pos.y + this._size.height) >= Constants.CANVAS_HEIGHT)
                ? Constants.CANVAS_HEIGHT - this._size.height : pos.y;
            return pos;
        },

        /**
         * @param {goog.math.Coordinate} pos
         * @returns {goog.math.Coordinate}
         * @private
         */
        _calculateCorrectShapePositionForResizing: function (pos) {
            pos.x = (Math.abs(pos.x - (this._position.x + this._size.width)) >= Constants.MAX_SHAPE_WIDTH)
                ? this._position.x + this._size.width - Constants.MAX_SHAPE_WIDTH : pos.x;
            pos.x = (Math.abs(pos.x - (this._position.x + this._size.width)) <= Constants.MIN_SHAPE_WIDTH)
                ? this._position.x + this._size.width - Constants.MIN_SHAPE_WIDTH : pos.x;
            pos.y = (Math.abs(pos.y - (this._position.y + this._size.height)) >= Constants.MAX_SHAPE_HEIGHT)
                ? this._position.y + this._size.height - Constants.MAX_SHAPE_HEIGHT : pos.y;
            pos.y = (Math.abs(pos.y - (this._position.y + this._size.height)) <= Constants.MIN_SHAPE_HEIGHT)
                ? this._position.y + this._size.height - Constants.MIN_SHAPE_HEIGHT : pos.y;
            return pos;
        },

        /**
         * @param {number} xPos
         * @returns {number}
         * @private
         */
        _calculateCorrectXPosWithShapeMinWidth: function (xPos) {
            xPos = (xPos > (this._position.x + this._size.width))
                ? this._position.x + this._size.width - Constants.MIN_SHAPE_WIDTH : xPos;
            return xPos;
        },

        /**
         * @param {number} yPos
         * @returns {number}
         * @private
         */
        _calculateCorrectYPosWithShapeMinHeight: function (yPos) {
            yPos = (yPos > (this._position.y + this._size.height))
                ? this._position.y + this._size.height - Constants.MIN_SHAPE_HEIGHT : yPos;
            return yPos;
        },

        /**
         * @private
         */
        _createResizePoints: function () {
            this._points.push(new TestApplication.view.ResizePoint("nw"));
            this._points.push(new TestApplication.view.ResizePoint("ne"));
            this._points.push(new TestApplication.view.ResizePoint("se"));
            this._points.push(new TestApplication.view.ResizePoint("sw"));
            for (var i = 0; i < this._points.length; ++i) {
                this._frame.appendChild(this._points[i].getObject());
            }
        },

        /**
         * @param {goog.math.Size} size
         * @private
         */
        _setPositionOfPoints: function (size) {
            goog.style.setPosition(this._points[0].getObject(), new goog.math.Coordinate(-Constants.RESIZE_POINT_RADIUS,
                -Constants.RESIZE_POINT_RADIUS));
            goog.style.setPosition(this._points[1].getObject(), new goog.math.Coordinate(size.width - Constants.RESIZE_POINT_RADIUS,
                -Constants.RESIZE_POINT_RADIUS));
            goog.style.setPosition(this._points[2].getObject(), new goog.math.Coordinate(size.width - Constants.RESIZE_POINT_RADIUS,
                size.height - Constants.RESIZE_POINT_RADIUS));
            goog.style.setPosition(this._points[3].getObject(), new goog.math.Coordinate(-Constants.RESIZE_POINT_RADIUS,
                size.height - Constants.RESIZE_POINT_RADIUS));

        }
    })
});