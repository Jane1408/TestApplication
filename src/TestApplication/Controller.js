goog.provide("TestApplication.Controller");

goog.require("TestApplication.view.View");
goog.require("TestApplication.view.Toolbar");
goog.require("TestApplication.model.Model");
goog.require("TestApplication.History");
goog.require("TestApplication.commands.AddShapeCommand");
goog.require("TestApplication.commands.MoveShapeCommand");
goog.require("TestApplication.commands.ResizeShapeCommand");
goog.require("TestApplication.commands.RemoveShapeCommand");
goog.require("TestApplication.ScreenElement");
goog.require("TestApplication.Constants");

goog.scope(function() {
    const SCREEN_ELEMENT = TestApplication.ScreenElement;
    const CONST = TestApplication.Constants;

    /**
     * @constructor
     */
    TestApplication.Controller = goog.defineClass(null, {
        constructor: function () {
            this._dispatcher = document;
            /**@private {TestApplication.model.Model}*/
            this._model = new TestApplication.model.Model();
            /**@private {TestApplication.view.Toolbar}*/
            this._toolbar = new TestApplication.view.Toolbar();
            /**@private {TestApplication.History}*/
            this._history = new TestApplication.History();
            /**@private {TestApplication.view.View}*/
            this._view = new TestApplication.view.View();

            this._addToolbarActionListen();
            this._addShapeAddedListen();
            this._addShapeMoveAndResizeListen();
            this._addRedrawShapeListen();
            this._addDeleteClickListen();
            this._addRemoveShapeListen();
        },

        /**
         * @private
         */
        _addToolbarActionListen: function () {
            this._dispatcher.addEventListener(TestApplication.EventType.ACTION, goog.bind(function (e) {
                if (e.detail.id == SCREEN_ELEMENT.UNDO) {
                    this._undo();
                }
                else if (e.detail.id == SCREEN_ELEMENT.REDO) {
                    this._redo();
                }
                else {
                    this._addShape(e.detail.id);
                }
            }, this), false);
        },

        /**
         * @private
         */
        _addShapeAddedListen: function () {
            this._dispatcher.addEventListener(TestApplication.EventType.SHAPE_ADDED, goog.bind(function (e) {
                this._view.drawShape(e.detail);
            }, this), false);
        },

        /**
         * @private
         */
        _addShapeMoveAndResizeListen: function () {
            var canvas = this._view.getBody();
            canvas.onmousedown = goog.bind(function (e) {
                var key = this._view.getShapeIndexByClickPos(e);
                if (this._view.isShapeSelected() && this._view.checkResizePointsOnclick(e)) {
                    this._resizeListen();
                }
                else if (key) {
                    this._moveListen(key, e);
                }
                else {
                    this._view.deselect();
                }
            }, this);
            canvas.ondragstart = function() {
                return false;
            };
        },

        /**
         * @private
         * @param {number} key
         * @param  e
         */
        _moveListen: function (key, e) {
            goog.style.setStyle(document.documentElement, "cursor", "move");
            var shapeModel = this._model.getShapeByKey(key);
            if (shapeModel != null) {
                this._view.selectShape(key);
                var shift = new goog.math.Coordinate(e.pageX - shapeModel.getPosition().x, e.pageY - shapeModel.getPosition().y);
                var pos = new goog.math.Coordinate(e.pageX - shift.x, e.pageY - shift.y);
                document.onmousemove = goog.bind(function (e) {
                    pos = new goog.math.Coordinate(e.pageX - shift.x, e.pageY - shift.y);
                    this._view.moveShapeView(pos);
                }, this);

                document.onmouseup = goog.bind(function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if (pos.x != shapeModel.getPosition().x && pos.y != shapeModel.getPosition().y) {
                        this._moveShape(shapeModel, pos);
                    }
                    goog.style.setStyle(document.documentElement, "cursor", "default");
                }, this);
            }
        },

        /**
         * @private
         */
        _resizeListen: function () {
            var key = this._view.getIndexOfSelectedShape();
            var shapeModel = this._model.getShapeByKey(key);
            if (shapeModel != null) {
                document.onmousemove = goog.bind(function (e) {
                    this._view.resizeShapeView(e);
                }, this);

                document.onmouseup = goog.bind(function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    var pos = this._view.getFramePosition();
                    var size = this._view.getFrameSize();
                    this._resizeShape(shapeModel, pos, size);
                    goog.style.setStyle(document.documentElement, "cursor", "default");
                }, this);
            }
            else{
                goog.style.setStyle(document.documentElement, "cursor", "default");
            }
        },

        /**
         * @private
         */
        _addRedrawShapeListen: function () {
            this._dispatcher.addEventListener(TestApplication.EventType.UPDATE_SHAPE, goog.bind(function (e) {
                this._view.redrawShape(e.detail);
            }, this), false);
        },

        /**
         * @private
         */
        _addDeleteClickListen: function () {
            this._dispatcher.addEventListener("keypress", goog.bind(function (e) {
                if (e.keyCode == CONST.KEY_DELETE_CODE && this._view.isShapeSelected()) {
                    var shape = this._model.getShapeByKey(this._view.getIndexOfSelectedShape());
                    this._removeShape(shape);
                }
            }, this), false);
        },

        /**
         * @private
         */
        _addRemoveShapeListen: function () {
            this._dispatcher.addEventListener(TestApplication.EventType.REMOVE_SHAPE, goog.bind(function (e) {
                this._view.removeShape(e.detail);
            }, this), false);
        },

        /**
         * @private
         * @param {string} type
         */
        _addShape: function (type) {
            var command = new TestApplication.commands.AddShapeCommand(this._model, type);
            this._history.addCommand(command);
        },

        /**
         * @private
         * @param {TestApplication.model.ShapeModel} shape
         * @param {goog.math.Coordinate} pos
         * @param {goog.math.Size} size
         */
        _resizeShape: function (shape, pos, size) {
            var command = new TestApplication.commands.ResizeShapeCommand(shape, pos, size);
            this._history.addCommand(command);
        },

        /**
         * @private
         * @param {TestApplication.model.ShapeModel} shape
         */
        _removeShape: function (shape) {
            var command = new TestApplication.commands.RemoveShapeCommand(this._model, shape);
            this._history.addCommand(command);
        },

        /**
         * @private
         * @param {TestApplication.model.ShapeModel} shape
         * @param {goog.math.Coordinate} pos
         */
        _moveShape: function (shape, pos) {
            var command = new TestApplication.commands.MoveShapeCommand(shape, pos);
            this._history.addCommand(command);
        },

        /**
         * @private
         */
        _undo: function () {
            this._view.deselect();
            this._history.undo();
        },

        /**
         * @private
         */
        _redo: function () {
            this._view.deselect();
            this._history.redo();
        }
    });
});