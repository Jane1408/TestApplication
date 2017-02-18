goog.provide("TestApplication.commands.AddShapeCommand");

goog.require("TestApplication.commands.ICommand");
goog.require("TestApplication.model.ShapeModel");

goog.scope(function() {
    /**
     * @constructor
     * @param {TestApplication.model.Model} model
     * @param {string} type
     * @extends {TestApplication.commands.ICommand}
     */
    TestApplication.commands.AddShapeCommand = goog.defineClass(TestApplication.commands.ICommand, {
        constructor: function (model, type) {
            this._dispatcher = document;

            /** @private {TestApplication.model.Model}*/
            this._model = model;
            /** @private {TestApplication.model.ShapeModel} */
            this._newShape = new TestApplication.model.ShapeModel(type);
        },

        /**
         * @inheritDoc
         */
        execute: function () {
            this._model.addShape(this._newShape);
            var event = new CustomEvent(TestApplication.EventType.DRAW_SHAPE, {
                "detail": {
                    "shape": this._newShape
                }
            });
            this._dispatcher.dispatchEvent(event);
        },

        /**
         * @inheritDoc
         */
        unExecute: function () {
            this._model.removeShape(this._newShape);
            var event = new CustomEvent(TestApplication.EventType.REMOVE_SHAPE, {
                "detail": {
                    "shape": this._newShape
                }
            });
            this._dispatcher.dispatchEvent(event);
        }
    })
});