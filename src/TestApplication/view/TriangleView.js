goog.provide("TestApplication.view.TriangleView");

goog.require("TestApplication.view.ShapeView");
goog.require("goog.style");

goog.scope(function()
{
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} model
     * @extends {TestApplication.view.ShapeView}
     */
    TestApplication.view.TriangleView = goog.defineClass(TestApplication.view.ShapeView, {
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
            this.resize(this.getSize());

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
        resize: function(size){
            goog.style.setStyle(this._shape, "border-left", size.width / 2 + "px solid transparent" );
            goog.style.setStyle(this._shape, "border-right", size.width / 2 + "px solid transparent" );
            goog.style.setStyle(this._shape, "border-bottom", size.height + "px solid #fff536" );

        },

        /**
         * @inheritDoc
         */
        hitTest: function(clickPos) {
            var topLeft = this.getPosition();
            var bottomRight = new goog.math.Coordinate(this.getSize().width + topLeft.x, this.getSize().height + topLeft.y);
            var firstCondition = clickPos.y > (2 * (topLeft.y - bottomRight.y) * (clickPos.x - topLeft.x) / (bottomRight.x - topLeft.x) + bottomRight.y);
            var secondCondition = clickPos.y > (2 * (topLeft.y - bottomRight.y) * (clickPos.x - bottomRight.x) / (topLeft.x - bottomRight.x) + bottomRight.y);
            var thirdCondition = clickPos.y < bottomRight.y;
            return (firstCondition && secondCondition && thirdCondition);

}
    })
});