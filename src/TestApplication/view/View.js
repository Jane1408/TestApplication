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


goog.scope(function() {
    const SCREEN_ELEMENT = TestApplication.ScreenElement;
    const SHAPE_TYPE = TestApplication.ShapeType;
    const CONST = TestApplication.Constants;
    /**
     * @constructor
     */
    TestApplication.view.View = goog.defineClass(null, {
        constructor: function () {
            /** @private {Array<TestApplication.view.ShapeView>}*/
            this._shapes = [];
            /** @private {TestApplication.view.Frame} */
            this._frame = new TestApplication.view.Frame();
            /** @private {TestApplication.view.ShapeView} */
            this._selectedShape = null;

            this._createBody();
        },

        /**
         * @private
         */
        _createBody: function () {
            /** @private {Element} */
            this._body = goog.dom.createElement(goog.dom.TagName.DIV);
            this._body.setAttribute("class", SCREEN_ELEMENT.CANVAS);
            goog.style.setSize(this._body, new goog.math.Size(CONST.CANVAS_WIDTH, CONST.CANVAS_HEIGHT));
            document.body.appendChild(this._body);
        },

        /**
         * @return number
         */
        getIndexOfSelectedShape: function () {
            if (this._selectedShape != null) {
                return this._selectedShape.getKey();
            }
            return 0;
        },

        /**
         * @return boolean
         */
        isShapeSelected: function () {
            return this._selectedShape != null;
        },
/**
* @private
*/
        _drawFrame: function () {
            this._body.appendChild(this._frame.getObject());
        },

        deselect: function () {
            if (this._frame.isActive()) {
                this._body.removeChild(this._frame.getObject());
                this._frame.deactivate();
                this._selectedShape = null;
            }
        },

        clearScreen: function () {
            this.deselect();
            for (var i = 0; i != this._shapes.length; ++i) {
                this._body.removeChild(this._shapes[i].getObject());
            }
            this._shapes.splice(0, this._shapes.length);
        },

        /**
         * @param {TestApplication.model.ShapeModel} model
         */
        drawShape: function (model) {
            var type = model.getType();
            switch (type) {
                case SHAPE_TYPE.ELLIPSE:
                {
                    var ellipse = new TestApplication.view.EllipseView(model);
                    this._addShapeToArray(ellipse);
                    break;
                }
                case SHAPE_TYPE.TRIANGLE:
                {
                    var triangle = new TestApplication.view.TriangleView(model);
                    this._addShapeToArray(triangle);
                    break;
                }
                case SHAPE_TYPE.RECTANGLE:
                {
                    var rectangle = new TestApplication.view.RectangleView(model);
                    this._addShapeToArray(rectangle);
                    break;
                }
                default:
                    break;
            }
        },

        /**
         * @param {TestApplication.view.ShapeView} shape
         * @private
         */
        _addShapeToArray: function (shape) {
            if (shape.getLayerId() != -1) {
                for (var i = shape.getLayerId(); i < this._shapes.length; i++) {
                    this._body.removeChild(this._shapes[i].getObject());
                }
                goog.array.insertAt(this._shapes, shape, shape.getLayerId());
                for (var j = shape.getLayerId(); j < this._shapes.length; j++) {
                    this._body.appendChild(this._shapes[j].getObject());
                }
            }
            else {
                goog.array.insert(this._shapes, shape);
                this._body.appendChild(shape.getObject());
            }
        },

        /**
         * @param detail
         */
        redrawShape: function (detail) {
            var shape = this._getShapeByKey(detail.key);
            if (shape != null) shape.redraw();
        },

        /**
         * @param detail
         */
        removeShape: function (detail) {
            var shape = detail.shape;
            for (var i = 0; i != this._shapes.length; ++i) {
                if (shape.getKey() == this._shapes[i].getKey()) {
                    this._body.removeChild(this._shapes[i].getObject());
                    this._shapes.splice(i--, 1);
                    break;
                }
            }
            this.deselect();
        },

        /**
         * @param {goog.math.Coordinate} pos
         */
        moveShapeView: function (pos) {
            this._frame.move(pos);
        },

        /**
         * @param detail
         */
        resizeShapeView: function (detail) {
            var clickPos = this._transferMouseCoordinateToCanvasArea(detail.pageX, detail.pageY);
            this._frame.resize(clickPos);
        },

        /**
         * @return {Element}
         */
        getBody: function () {
            return this._body;
        },

        /**
         * @param {number} key
         * @return {?TestApplication.view.ShapeView}
         * @private
         */
        _getShapeByKey: function (key) {
            for (var i = 0; i != this._shapes.length; ++i) {
                if (key == this._shapes[i].getKey()) {
                    return this._shapes[i];
                }
            }
            return null;
        },

        /**
         * @param {number} key
         */
        selectShape: function (key) {
            this.deselect();
            var shape = this._getShapeByKey(key);
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
        getShapeKeyByClickPos: function (detail) {
            var clickPos = this._transferMouseCoordinateToCanvasArea(detail.pageX, detail.pageY);
            if (clickPos.y <= CONST.CANVAS_HEIGHT && clickPos.x <= CONST.CANVAS_WIDTH) {
                for (var i = this._shapes.length - 1; i >= 0; i--) {
                    if (this._shapes[i].hitTest(clickPos)) {
                        return this._shapes[i].getKey();
                    }
                }
            }
            return 0;
        },
        /**
         * @param detail
         * @returns {boolean}
         */
        checkResizePointsOnclick: function (detail) {
            var pos = this._transferMouseCoordinateToCanvasArea(detail.pageX, detail.pageY);
            return (this._frame.isActive() && this._frame.checkPoints(pos));
        },

        /**
         * @return {goog.math.Size}
         */
        getFrameSize: function () {
            return this._frame.getSize();
        },

        /**
         * @return {goog.math.Coordinate}
         */
        getFramePosition: function () {
            return this._frame.getPosition();
        },

        /**
         * @param {number} xPos
         * @param {number} yPos
         * @returns {goog.math.Coordinate}
         * @private
         */
        _transferMouseCoordinateToCanvasArea: function (xPos, yPos) {
            return (new goog.math.Coordinate(xPos, yPos - CONST.TOOLBAR_HEIGHT));
        },
    });
});