goog.provide("TestApplication.view.Frame");

goog.require("goog.math");
goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.view.Frame = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(0, 0);

            /**@private {goog.math.Size}*/
            this._size = new goog.math.Size(0, 0);

            /**@private {boolean}*/
            this._isActive = false;

            this._frame = goog.dom.createElement(goog.dom.TagName.DIV);
            this._frame.setAttribute("class", "frame");
        },
        
        setShape: function(shape)
        {
            goog.style.setPosition(this._frame, shape.getPosition());
            goog.style.setSize(this._frame, shape.getSize());
            this._isActive = true;
        },
        
        setPosition: function(pos)
        {
            goog.style.setPosition(this._frame, pos);
        },
        
        isActive: function()
        {
            return this._isActive;
        },
        
        getObject: function()
        {
            return this._frame;
        }


    })
});