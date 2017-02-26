goog.provide("TestApplication.commands.RemoveShapeCommand");

goog.require("TestApplication.commands.ICommand");

goog.scope(function () {
    /**
     * @constructor
     * @param {TestApplication.model.ShapeCollection} model
     * @param {TestApplication.model.ShapeModel} shape
     * @extends {TestApplication.commands.ICommand}
     */
    TestApplication.commands.RemoveShapeCommand = goog.defineClass(TestApplication.commands.ICommand, {
        constructor: function (model, shape) {
            this._dispatcher = document;

            /**@private {TestApplication.model.ShapeCollection}*/
            this._model = model;

            /**@private {TestApplication.model.ShapeModel}*/
            this._shape = shape;
        },

        /**
         * @inheritDoc
         */
        execute: function () {
            this._model.removeShape(this._shape);
            var event = new CustomEvent(TestApplication.EventType.REMOVE_SHAPE, {
                "detail" : {
                    "shape": this._shape
                }
            });
            this._dispatcher.dispatchEvent(event);
        },

        /**
         * @inheritDoc
         */
        unExecute: function () {
            this._model.addShape(this._shape);
            var event = new CustomEvent(TestApplication.EventType.DRAW_SHAPE, {
                "detail" : {
                    "shape": this._shape
                }
            });
            this._dispatcher.dispatchEvent(event);
        },
    })
});