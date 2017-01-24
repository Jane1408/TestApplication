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
    const ShapeType = TestApplication.ShapeType;
    /**
     * @constructor
     */
    TestApplication.view.View = goog.defineClass(null, {
        constructor: function () {
            /** @private {Array<Element>} */
            this._shapes = [];

            /**@private {number}*/
            this._width = TestApplication.view.View.CANVAS_WIDTH;
            /**@private {number}*/
            this._height = TestApplication.view.View.CANVAS_HEIGHT;
            this._body = goog.dom.createElement(goog.dom.TagName.DIV);
            this._body.setAttribute("class","canvas");
            
            goog.style.setSize(this._body, new goog.math.Size(this._width, this._height));
            document.body.appendChild(this._body);

            this._frame = new TestApplication.view.Frame();
            
            this._selectedShape = null;
        },
        
        isShapeSelected: function()
        {
            return this._selectedShape != null;
        },
        
        drawFrame: function()
        {
            this._body.appendChild(this._frame.getObject());
        },
        
        deselect: function()
        {
            this._body.removeChild(this._frame.getObject());
            this._selectedShape = null;
        },

        drawShape: function(detail)
        {
            var shape = detail.shape;
            var type = shape.getType();
            switch (type){
                case ShapeType.ELLIPSE:
                {
                    var ellipse = new TestApplication.view.EllipseView(shape);
                    this._body.appendChild(ellipse.getObject());
                    this._shapes.push(ellipse);
                    break;
                }
                case ShapeType.TRIANGLE:
                {
                    var triangle = new TestApplication.view.TriangleView(shape);
                    this._body.appendChild(triangle.getObject());
                    this._shapes.push(triangle);
                    break;
                }
                case ShapeType.RECTANGLE:
                {
                    var rectangle = new TestApplication.view.RectangleView(shape);
                    this._body.appendChild(rectangle.getObject());
                    this._shapes.push(rectangle);
                    break;
                }
                default:
                    return;
            }
        },
        
        redrawShape: function(detail)
        {
            console.log("4!");
            var shape = this.getShapeByKey(detail.key);
            shape.redraw();
            this._frame.setPosition(detail.pos);
        },

        moveShapeView: function(key, pos)
        {
            var shape = this.getShapeByKey(key);
            shape.move(pos);
            this._frame.setPosition(pos);
        },
        
        getBody: function()
        {
            return this._body;
        },

        getShapeByKey: function(key)
        {
            for (var i = 0; i != this._shapes.length; ++i) {
                if (key == this._shapes[i].getIndex())
                {
                    return this._shapes[i];
                }
            }
            return null;

        },
        
        trySelectShape: function(key)
        {
            var shape = this.getShapeByKey(key);
            if (shape != undefined)
            {
                this._frame.setShape(shape);
                this.drawFrame();
                this._selectedShape = shape;
               // return true;
            }
          //  return false;
        },
        
        
        statics:
        {
            CANVAS_WIDTH: 640,
            CANVAS_HEIGHT: 480,
        }

    });
});