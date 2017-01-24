goog.provide("TestApplication.commands.MoveShapeCommand");

goog.require("goog.array");
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
            console.log("3!");
            this._shape.setPosition(this._newPos);
            var event = new CustomEvent(TestApplication.EventType.REDRAW_SHAPE, {
            "detail":{
                "key" : this._shape.getKey(),
                "pos" : this._newPos,
            }
            });
            document.dispatchEvent(event);


            console.log(this._shape.getPosition() + " == " + this._newPos);
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

            console.log("back");
        }
    })
});