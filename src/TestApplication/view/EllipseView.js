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

        getIndex: function()
        {
            return this.getKey();
        },
        
        getObject: function()
        {
            return this._shape;
        },

        redraw: function()
        {
            goog.style.setPosition(this._shape, this.getPosition());
        },
        
        move: function(pos){
            goog.style.setPosition(this._shape, pos);
        }

    })
});