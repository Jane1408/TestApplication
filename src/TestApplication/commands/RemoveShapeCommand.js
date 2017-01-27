goog.provide("TestApplication.commands.RemoveShapeCommand");

goog.require("TestApplication.commands.ICommand");
goog.require("goog.array");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.commands.RemoveShapeCommand = goog.defineClass(TestApplication.commands.ICommand, {
        constructor: function(model, shape)
        {
            this._dispatcher = document;
            
            /**@private {TestApplication.model.Model}*/
            this._model = model;

            /**@private {TestApplication.model.ShapeModel}*/
            this._shape = shape;
            
        },

        /**
         * @inheritDoc
         */
        execute: function()
        {
            var event = new CustomEvent(TestApplication.EventType.REMOVE_SHAPE, {
                "detail" : {
                    "shape" : this._shape
                }
            });
            this._dispatcher.dispatchEvent(event);
            this._model.removeShape(this._shape);
        },

        /**
         * @inheritDoc
         */
        unExecute: function(){
            var event = new CustomEvent(TestApplication.EventType.REDRAW_SHAPE, {
                "detail" : {
                    "shape" : this._shape
                }
            });
            this._dispatcher.dispatchEvent(event);
            this._model.addShape(this._shape);
        }
    })
});