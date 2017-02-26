goog.provide("TestApplication.view.View");

goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.math");
goog.require("TestApplication.ShapeType");
goog.require("TestApplication.view.EllipseView");
goog.require("TestApplication.view.RectangleView");
goog.require("TestApplication.view.TriangleView");
goog.require("TestApplication.view.Frame");
goog.require("TestApplication.Constants");
goog.require("TestApplication.ScreenElement");
goog.require("TestApplication.EventType");


goog.scope(function () {
    const EventType = TestApplication.EventType;
    const ScreenElement = TestApplication.ScreenElement;
    const ShapeType = TestApplication.ShapeType;
    const Constants = TestApplication.Constants;
    /**
     * @constructor
     */
    TestApplication.view.View = goog.defineClass(null, {
        constructor: function () {
            this._dispatcher = document;
            /** @private {Array<TestApplication.view.ShapeView>}*/
            this._shapes = [];
            /** @private {TestApplication.view.Frame} */
            this._frame = new TestApplication.view.Frame();
            /** @private {TestApplication.view.ShapeView} */
            this._selectedShape = null;
            this._createCanvas();
            this._shapeMoveAndResizeListener();
        },

        /**
         * @private
         */
        _shapeMoveAndResizeListener: function () {
            this._canvas.onmousedown = goog.bind(function (e) {
                var id = this._getShapeIdByClickPos(e);
                if (this._selectedShape != null && this._checkResizePointsOnclick(e)) {
                    this._resizeListener();
                }
                else if (id) {
                    this._moveListener(id, e);
                }
                else {
                    this.deselect();
                }
            }, this);
        },

        /**
         * @private
         * @param {number} id
         * @param  e
         */
        _moveListener: function (id, e) {
            goog.style.setStyle(document.documentElement, "cursor", "move");
            this._selectShape(id);
            var shift = new goog.math.Coordinate(e.pageX - this._selectedShape.getPosition().x, e.pageY - this._selectedShape.getPosition().y);
            var pos = new goog.math.Coordinate(e.pageX - shift.x, e.pageY - shift.y);
            document.onmousemove = goog.bind(function (e) {
                pos = new goog.math.Coordinate(e.pageX - shift.x, e.pageY - shift.y);
                this._moveShapeView(pos);
            }, this);

            document.onmouseup = goog.bind(function () {
                document.onmousemove = null;
                document.onmouseup = null;
                if (pos.x != this._selectedShape.getPosition().x || pos.y != this._selectedShape.getPosition().y) {
                    var event = new CustomEvent(EventType.MOVE_SHAPE, {
                        "detail" : {
                            "id": id,
                            "pos": pos
                        }
                    });
                    this._dispatcher.dispatchEvent(event);
                }
                goog.style.setStyle(document.documentElement, "cursor", "default");
            }, this);

        },

        /**
         * @private
         */
        _resizeListener: function () {
            var id = this.getIdOfSelectedShape();
            document.onmousemove = goog.bind(function (e) {
                this._resizeShapeView(e);
            }, this);

            document.onmouseup = goog.bind(function () {
                document.onmousemove = null;
                document.onmouseup = null;
                var pos = this._frame.getPosition();
                var size = this._frame.getSize();
                var event = new CustomEvent(EventType.RESIZE_SHAPE, {
                    "detail" : {
                        "id": id,
                        "pos": pos,
                        "size": size
                    }
                });
                this._dispatcher.dispatchEvent(event);
                goog.style.setStyle(document.documentElement, "cursor", "default");
            }, this);
        },

        isShapeSelected: function () {
            return this._selectedShape != null;
        },

        /**
         * @return number
         */
        getIdOfSelectedShape: function () {
            if (this._selectedShape != null) {
                return this._selectedShape.getId();
            }
            return 0;
        },

        deselect: function () {
            if (this._frame.isActive()) {
                this._canvas.removeChild(this._frame.getElement());
                this._frame.deactivate();
                this._selectedShape = null;
            }
        },

        clearScreen: function () {
            this.deselect();
            for (var i = 0; i != this._shapes.length; ++i) {
                this._canvas.removeChild(this._shapes[i].getElement());
            }
            this._shapes.splice(0, this._shapes.length);
        },

        /**
         * @param {TestApplication.model.ShapeModel} shape
         */
        drawShape: function (shape) {
            var type = shape.getType();
            switch (type) {
                case ShapeType.ELLIPSE: {
                    var ellipse = new TestApplication.view.EllipseView(shape);
                    this._addShapeToArray(ellipse);
                    break;
                }
                case ShapeType.TRIANGLE: {
                    var triangle = new TestApplication.view.TriangleView(shape);
                    this._addShapeToArray(triangle);
                    break;
                }
                case ShapeType.RECTANGLE: {
                    var rectangle = new TestApplication.view.RectangleView(shape);
                    this._addShapeToArray(rectangle);
                    break;
                }
                default:
                    break;
            }
        },

        /**
         * @param id
         */
        redrawShape: function (id) {
            var shape = this._getShapeViewById(id);
            if (shape != null) shape.redraw();
        },

        /**
         * @param shape
         */
        removeShape: function (shape) {
            for (var i = 0; i != this._shapes.length; ++i) {
                if (shape.getId() == this._shapes[i].getId()) {
                    this._canvas.removeChild(this._shapes[i].getElement());
                    this._shapes.splice(i--, 1);
                    break;
                }
            }
            this.deselect();
        },

        /**
         * @param {goog.math.Coordinate} pos
         */
        _moveShapeView: function (pos) {
            this._frame.move(pos);
        },

        /**
         * @param detail
         */
        _resizeShapeView: function (detail) {
            var clickPos = this._transferMouseCoordinateToCanvasArea(detail.pageX, detail.pageY);
            this._frame.resize(clickPos);
        },

        /**
         * @param {number} id
         */
        _selectShape: function (id) {
            this.deselect();
            var shape = this._getShapeViewById(id);
            if (shape != null) {
                this._frame.setShape(shape);
                this._drawFrame();
                this._selectedShape = shape;
            }
        },

        /**
         * @param detail
         * @return {number}
         */
        _getShapeIdByClickPos: function (detail) {
            var clickPos = this._transferMouseCoordinateToCanvasArea(detail.pageX, detail.pageY);
            if (clickPos.y <= Constants.CANVAS_HEIGHT && clickPos.x <= Constants.CANVAS_WIDTH) {
                for (var i = this._shapes.length - 1; i >= 0; i--) {
                    if (this._shapes[i].hitTest(clickPos)) {
                        return this._shapes[i].getId();
                    }
                }
            }
            return 0;
        },

        /**
         * @param detail
         * @returns {boolean}
         */
        _checkResizePointsOnclick: function (detail) {
            var pos = this._transferMouseCoordinateToCanvasArea(detail.pageX, detail.pageY);
            return (this._frame.isActive() && this._frame.checkPoints(pos));
        },

        /**
         * @private
         */
        _createCanvas: function () {
            /** @private {Element} */
            this._canvas = goog.dom.createElement(goog.dom.TagName.DIV);
            this._canvas.setAttribute("class", ScreenElement.CANVAS);
            goog.style.setSize(this._canvas, new goog.math.Size(Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT));
            document.body.appendChild(this._canvas);
        },

        /**
         * @private
         */
        _drawFrame: function () {
            this._canvas.appendChild(this._frame.getElement());
        },

        /**
         * @param {TestApplication.view.ShapeView} shape
         * @private
         */
        _addShapeToArray: function (shape) {
            if (shape.getLevel() != -1) {
                for (var i = shape.getLevel(); i < this._shapes.length; i++) {
                    this._canvas.removeChild(this._shapes[i].getElement());
                }
                goog.array.insertAt(this._shapes, shape, shape.getLevel());
                for (var j = shape.getLevel(); j < this._shapes.length; j++) {
                    this._canvas.appendChild(this._shapes[j].getElement());
                }
            }
            else {
                goog.array.insert(this._shapes, shape);
                this._canvas.appendChild(shape.getElement());
            }
        },

        /**
         * @param {number} id
         * @return {?TestApplication.view.ShapeView}
         * @private
         */
        _getShapeViewById: function (id) {
            for (var i = 0; i != this._shapes.length; ++i) {
                if (id == this._shapes[i].getId()) {
                    return this._shapes[i];
                }
            }
            return null;
        },

        /**
         * @param {number} xPos
         * @param {number} yPos
         * @returns {goog.math.Coordinate}
         * @private
         */
        _transferMouseCoordinateToCanvasArea: function (xPos, yPos) {
            return (new goog.math.Coordinate(xPos, yPos - Constants.TOOLBAR_HEIGHT));
        }
    });
});