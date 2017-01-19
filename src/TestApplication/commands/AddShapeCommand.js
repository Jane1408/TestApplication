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
            console.log("COMMAND");
            this._model = model;
            this._newShape = new TestApplication.model.ShapeModel(type);
        },

        /**
         * @public
         */
        execute:function()
        {
            this._model.addShape(this._newShape);
        },

        /**
         * @public
         */
        unExecute:function()
        {
            this._model.removeShape(this._newShape);
        }
    })
});