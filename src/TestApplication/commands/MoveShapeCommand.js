goog.provide("TestApplication.commands.MoveShapeCommand");

goog.require("TestApplication.commands.ICommand");
goog.require("goog.math");

goog.scope(function () {
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} shape
     * @param {goog.math.Coordinate} pos
     * @extends {TestApplication.commands.ICommand}
     */
    TestApplication.commands.MoveShapeCommand = goog.defineClass(TestApplication.commands.ICommand, {
        constructor: function (shape, pos) {
            this._dispatcher = document;

            /**@private {TestApplication.model.ShapeModel}*/
            this._shape = shape;

            /**@private {goog.math.Coordinate}*/
            this._oldPos = shape.getPosition();

            /**@private {goog.math.Coordinate}*/
            this._newPos = pos;

        },

        /**
         * @inheritDoc
         */
        execute: function () {
            this._shape.setPosition(this._newPos);
            var event = new CustomEvent(TestApplication.EventType.UPDATE_SHAPE, {
                "detail": {
                    "id": this._shape.getId()
                }
            });
            this._dispatcher.dispatchEvent(event);
        },

        /**
         * @inheritDoc
         */
        unExecute: function () {
            this._shape.setPosition(this._oldPos);
            var event = new CustomEvent(TestApplication.EventType.UPDATE_SHAPE, {
                "detail": {
                    "id": this._shape.getId()
                }
            });
            this._dispatcher.dispatchEvent(event);
        }
    })
});