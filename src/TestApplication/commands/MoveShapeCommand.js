goog.provide("TestApplication.commands.MoveShapeCommand");

goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.commands.MoveShapeCommand = goog.defineClass(null, {
        constructor:function(shape, pos)
        {
            /**@private {TestApplication.model.ShapeModel}*/
            this._shape = shape;

            /**@private {goog.math.Coordinate}*/
            this._oldPos = shape.getPosition();

            /**@private {goog.math.Coordinate}*/
            this._newPos = pos;

        },

        /**
         * @public
         */
        execute:function()
        {
            this._shape.setPosition(this._newPos);
            var event = new CustomEvent(TestApplication.EventType.REDRAW_SHAPE, {
            "detail":{
                "key" : this._shape.getKey(),
                "pos" : this._newPos,
            }
            });
            document.dispatchEvent(event);
        },

        /**
         * @public
         */
        unExecute:function()
        {
            this._shape.setPosition(this._oldPos);
            var event = new CustomEvent(TestApplication.EventType.REDRAW_SHAPE, {
                "detail":{
                    "key" : this._shape.getKey(),
                    "pos" :this._oldPos,
                }
            });
            document.dispatchEvent(event);
        }
    })
});