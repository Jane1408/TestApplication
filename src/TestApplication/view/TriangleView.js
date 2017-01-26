goog.provide("TestApplication.view.TriangleView");

goog.require("TestApplication.view.ShapeView");
goog.require("goog.style");

goog.scope(function()
{
    var shapeView = TestApplication.view.ShapeView;
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} model
     */
    TestApplication.view.TriangleView = goog.defineClass(shapeView, {
        constructor:function(model)
        {
            goog.base(this, model);
            this._shape = goog.dom.createElement(goog.dom.TagName.DIV);
            this._shape.setAttribute("class", "triangle-shape");
            goog.style.setPosition(this._shape,  this.getPosition());
        },
        
        /**
         * @inheritDoc
         */
        getIndex: function()
        {
            return this.getKey();
        },

        /**
         * @inheritDoc
         */
        getObject: function()
        {
            return this._shape;
        },

        /**
         * @inheritDoc
         */
        redraw: function()
        {
            goog.style.setPosition(this._shape,  this.getPosition());
        },

        /**
         * @inheritDoc
         */
        move: function(pos){
            goog.style.setPosition(this._shape, pos);
        },

        /**
         * @inheritDoc
         */
        hitTest: function(clickPos) {
            var topLeft = this.getPosition();
            var bottomRight = new goog.math.Coordinate(this.getSize().width + topLeft.x, this.getSize().height + topLeft.y);
            return (clickPos.y > 2 * (topLeft.y - bottomRight.y) * (clickPos.x - topLeft.x) / (bottomRight.x - topLeft.x) + bottomRight.y
            && clickPos.y > 2 * (topLeft.y - bottomRight.y) * (clickPos.x - bottomRight.x) / (topLeft.x - bottomRight.x) + bottomRight.y
            && clickPos.y < bottomRight.y); 
 
        }
    })
});