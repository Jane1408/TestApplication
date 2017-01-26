goog.provide("TestApplication.view.EllipseView");

goog.require("TestApplication.view.ShapeView");
goog.require("goog.style");

goog.scope(function()
{
    var shapeView = TestApplication.view.ShapeView;
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} model
     */
    TestApplication.view.EllipseView = goog.defineClass(shapeView, {
        constructor:function(model)
        {
            goog.base(this, model);
            this._shape = goog.dom.createElement(goog.dom.TagName.DIV);
            this._shape.setAttribute("class", "shape");
            goog.style.setStyle(this._shape, "border-radius", (this.getSize().width / 2) + "px");
            goog.style.setPosition(this._shape,  this.getPosition());
            goog.style.setSize(this._shape, this.getSize());
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
            goog.style.setPosition(this._shape, this.getPosition());
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
            var shapePos = this.getPosition();
            var radius = new goog.math.Coordinate(this.getSize().width / 2, this.getSize().height / 2);
            var origin = new goog.math.Coordinate(shapePos.x + radius.x, shapePos.y + radius.y);
            var pointLocalPos = new goog.math.Coordinate(clickPos.x - origin.x, clickPos.y - origin.y);

            return (((Math.pow(pointLocalPos.x, 2) / Math.pow(radius.x, 2)) + (Math.pow(pointLocalPos.y, 2) / Math.pow(radius.y, 2))) <= 1);
        }
        
    })
});