goog.provide("TestApplication.commands.AddShapeCommand");

goog.require("TestApplication.commands.Command");
goog.require("TestApplication.model.ShapeModel");

goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.commands.AddShapeCommand = goog.defineClass(TestApplication.commands.Command, {
        constructor:function(model, type)
        {
            this._model = model;
            /**
             * @type {TestApplication.model.ShapeModel}
             */
            this._newShape = new TestApplication.model.ShapeModel(type);
        },

        /**
         * @public
         */
        execute:function()
        {
            this._model.addShape(this._newShape);
            var event = new CustomEvent(TestApplication.EventType.SHAPE_ADDED, {
                "detail" :{
                    "shape" : this._newShape
                }});
            document.dispatchEvent(event);
        },

        /**
         * @public
         */
        unExecute:function()
        {
            this._model.removeShape(this._newShape);
            var event = new CustomEvent(TestApplication.EventType.SHAPE_REMOVED, {
                "detail" :{
                    "shape" : this._newShape
                }});
            document.dispatchEvent(event);
        }
    })
});