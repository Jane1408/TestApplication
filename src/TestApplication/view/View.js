goog.provide("TestApplication.view.View");

goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.math");
goog.require("TestApplication.ShapeType");
goog.require("TestApplication.view.EllipseView");
goog.require("TestApplication.view.RectangleView");
goog.require("TestApplication.view.TriangleView");
goog.require("TestApplication.view.Frame");

goog.scope(function() {
    const SHAPE_TYPE = TestApplication.ShapeType;
    /**
     * @constructor
     */
    TestApplication.view.View = goog.defineClass(null, {
        constructor: function () {
            /** @private {Array<TestApplication.view.ShapeView>} */
            this._shapes = [];

            /**@private {number}*/
            this._width = TestApplication.view.View.CANVAS_WIDTH;

            /**@private {number}*/
            this._height = TestApplication.view.View.CANVAS_HEIGHT;
            
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
            this._body.setAttribute("class", "canvas");
            goog.style.setSize(this._body, new goog.math.Size(this._width, this._height));
            document.body.appendChild(this._body);
        },
        
        getIndexOfSelectedShape: function()
        {
            if (this._selectedShape != null)
            {
                return this._selectedShape.getIndex();
            }
            return 0;
            
        },

        isShapeSelected: function () {
            return this._selectedShape != null;
        },

        drawFrame: function () {
            this._body.appendChild(this._frame.getObject());
        },

        deselect: function () {
            this._body.removeChild(this._frame.getObject());
            this._selectedShape = null;
        },

        drawShape: function (detail) {
            var shape = detail.shape;
            var type = shape.getType();
            switch (type) {
                case SHAPE_TYPE.ELLIPSE:
                {
                    var ellipse = new TestApplication.view.EllipseView(shape);
                    this._addShapeToArray(ellipse);
                    break;
                }
                case SHAPE_TYPE.TRIANGLE:
                {
                    var triangle = new TestApplication.view.TriangleView(shape);
                    this._addShapeToArray(triangle);
                    break;
                }
                case SHAPE_TYPE.RECTANGLE:
                {
                    var rectangle = new TestApplication.view.RectangleView(shape);
                    this._addShapeToArray(rectangle);
                    break;
                }
                default:
                    return;
            }
        },

        /**
         * @param {TestApplication.view.ShapeView} shape
         */
        _addShapeToArray: function (shape) {
            this._body.appendChild(shape.getObject());
            this._shapes.push(shape);
        },

        redrawShape: function (detail) {
            var shape = this.getShapeByKey(detail.key);
            shape.redraw();
            this._frame.setPosition(detail.pos);
        },

        removeShape: function (detail) {
            var shape = detail.shape;
            for (var i = 0; i != this._shapes.length; ++i) {
                if (shape.getKey() == this._shapes[i].getIndex()) {
                    this._body.removeChild(this._shapes[i].getObject());
                    this._shapes.splice(i--, 1);
                    break;
                }
            }
            this.deselect();
            console.log("this._shapes.length = " + this._shapes.length);
        },

        moveShapeView: function (key, pos) {
            var shape = this.getShapeByKey(key);
            shape.move(pos);
            this._frame.setPosition(pos);
        },

        getBody: function () {
            return this._body;
        },

        getShapeByKey: function (key) {
            for (var i = 0; i != this._shapes.length; ++i) {
                if (key == this._shapes[i].getIndex()) {
                    return this._shapes[i];
                }
            }
            return null;
        },

        selectShape: function (key) {
            var shape = this.getShapeByKey(key);
            if (typeof shape != 'undefined') {
                this._frame.setShape(shape);
                this.drawFrame();
                this._selectedShape = shape;
            }
        },

        getShapeIndexByClickPos: function (detail) {
            var clickPos = new goog.math.Coordinate(detail.pageX, detail.pageY - TestApplication.view.View.TOOLBAR_OFFSET);
            if (clickPos.y <= TestApplication.view.View.CANVAS_HEIGHT &&
                clickPos.x <= TestApplication.view.View.CANVAS_WIDTH)
            {
                for (var i = this._shapes.length - 1; i >= 0; i--)
                {
                    if(this._shapes[i].hitTest(clickPos))
                    {
                        return this._shapes[i].getIndex();
                    }
                }
            }
            return 0;
        },

        checkResizePointsOnclick: function(detail)
        {
            var pos = new goog.math.Coordinate(detail.pageX, detail.pageY - TestApplication.view.View.TOOLBAR_OFFSET);
            return (this._frame.isActive() && this._frame.checkPoints(pos));
        },

         statics: {
            /**@type {number}*/
            CANVAS_WIDTH: 640,
            /**@type {number}*/
            CANVAS_HEIGHT: 480,
            /**@type {number}*/
            TOOLBAR_OFFSET: 55,
        }
    });
});