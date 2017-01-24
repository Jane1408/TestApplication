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
        /*    goog.style.setStyle(this._shape, "border-left", (this._size.width /2) + "px solid transparent");
            goog.style.setStyle(this._shape, "border-right", (this._size.width /2) + "px solid transparent");
            goog.style.setStyle(this._shape, "border-bottom", (this._size.width) + "px solid red"); */
            goog.style.setPosition(this._shape,  this.getPosition());
         

            //this._shape.setAttribute("class", "shape");
        //    goog.style.setPosition(this._shape,  this._position);
        //    goog.style.setSize(this._shape, this._size);

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
            goog.style.setPosition(this._shape,  this.getPosition());
        },

        move: function(pos){
            goog.style.setPosition(this._shape, pos);
        }
    })
});