goog.provide("TestApplication.commands.ResizeShapeCommand");

goog.require("TestApplication.commands.ICommand");

goog.scope(function () {
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} shape
     * @param {goog.math.Coordinate} pos
     * @param {goog.math.Size} size
     * @extends {TestApplication.commands.ICommand}
     */
    TestApplication.commands.ResizeShapeCommand = goog.defineClass(TestApplication.commands.ICommand, {
        constructor: function (shape, pos, size) {
            this._dispatcher = document;

            /**@private {TestApplication.model.ShapeModel}*/
            this._shape = shape;

            /**@private {goog.math.Coordinate}*/
            this._oldPos = shape.getPosition();

            /**@private {goog.math.Coordinate}*/
            this._newPos = pos;

            /**@private {goog.math.Size}*/
            this._oldSize = shape.getSize();

            /**@private {goog.math.Size}*/
            this._newSize = size;
        },

        /**
         * @inheritDoc
         */
        execute: function () {
            this._shape.setPosition(this._newPos);
            this._shape.setSize(this._newSize);
            var event = new CustomEvent(TestApplication.EventType.UPDATE_SHAPE, {
                "detail": {
                    "key": this._shape.getKey(),
                }
            });
            this._dispatcher.dispatchEvent(event);
        },

        /**
         * @inheritDoc
         */
        unExecute: function () {
            this._shape.setPosition(this._oldPos);
            this._shape.setSize(this._oldSize);
            var event = new CustomEvent(TestApplication.EventType.UPDATE_SHAPE, {
                "detail": {
                    "key": this._shape.getKey(),
                }
            });
            this._dispatcher.dispatchEvent(event);
        }
    })
});