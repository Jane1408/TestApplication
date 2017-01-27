goog.provide("TestApplication.commands.AddShapeCommand");

goog.require("TestApplication.commands.ICommand");
goog.require("TestApplication.model.ShapeModel");

goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.commands.AddShapeCommand = goog.defineClass(TestApplication.commands.ICommand, {
        constructor:function(model, type)
        {
            this._dispatcher = document;
            this._model = model;
            /** @type {TestApplication.model.ShapeModel} */
            this._newShape = new TestApplication.model.ShapeModel(type);
        },

        /**
         * @inheritDoc
         */
        execute:function()
        {
            this._model.addShape(this._newShape);
            var event = new CustomEvent(TestApplication.EventType.SHAPE_ADDED, {
                "detail" :{
                    "shape" : this._newShape
                }});
            this._dispatcher.dispatchEvent(event);
        },

        /**
         * @inheritDoc
         */
        unExecute:function()
        {
            this._model.removeShape(this._newShape);
            var event = new CustomEvent(TestApplication.EventType.REMOVE_SHAPE, {
                "detail" :{
                    "shape" : this._newShape
                }});
            this._dispatcher.dispatchEvent(event);
        }
    })
});