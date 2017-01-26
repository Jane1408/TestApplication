goog.provide("TestApplication.view.RectangleView");

goog.require("TestApplication.view.ShapeView");
goog.require("goog.style");

goog.scope(function()
{
    var shapeView = TestApplication.view.ShapeView;
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} model
     */
    TestApplication.view.RectangleView = goog.defineClass(shapeView, {
        constructor:function(model)
        {
            goog.base(this, model);
            this._shape = goog.dom.createElement(goog.dom.TagName.DIV);
            this._shape.setAttribute("class", "shape");
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
        hitTest: function(clickPos){
            var shapePos = this.getPosition();
            var size = this.getSize();
            return ((shapePos.x <= clickPos.x && clickPos.x <=  shapePos.x + size.width) &&
                (shapePos.y <= clickPos.y && clickPos.y <=  shapePos.y + size.height));
        }
    })
});