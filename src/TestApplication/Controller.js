goog.provide("TestApplication.Controller");

goog.require("TestApplication.view.View");
goog.require("TestApplication.view.Toolbar");
goog.require("TestApplication.model.Model");
goog.require("TestApplication.History");
goog.require("TestApplication.FileWorker");
goog.require("TestApplication.commands.AddShapeCommand");
goog.require("TestApplication.commands.MoveShapeCommand");
goog.require("TestApplication.commands.ResizeShapeCommand");
goog.require("TestApplication.commands.RemoveShapeCommand");
goog.require("TestApplication.Constants");

goog.scope(function () {
    const Constants = TestApplication.Constants;
    const EventType = TestApplication.EventType;
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
            /**@private {TestApplication.FileWorker}*/
            this._fileWorker = new TestApplication.FileWorker();

            this._addShapeListen();
            this._undoListen();
            this._redoListen();
            this._createNewListen();
            this._openFileListen();
            this._saveToFileListen();

            this._ShapeAddedListen();
            this._ShapeMoveAndResizeListen();
            this._RedrawShapeListen();
            this._DeleteClickListen();
            this._RemoveShapeListen();
            this._addShapesFromFileListen();
        },

        /**
         * @private
         */
        _addShapeListen: function () {
            this._dispatcher.addEventListener(EventType.ADD_SHAPE, goog.bind(function (e) {
                this._addShape(e.detail.id);
            }, this), false);
        },

        /**
         * @private
         */
        _undoListen: function () {
            this._dispatcher.addEventListener(EventType.UNDO, goog.bind(function () {
                this._undo();
            }, this), false);
        },

        /**
         * @private
         */
        _redoListen: function () {
            this._dispatcher.addEventListener(EventType.REDO, goog.bind(function () {
                this._redo();
            }, this), false);
        },

        /**
         * @private
         */
        _createNewListen: function () {
            this._dispatcher.addEventListener(EventType.CREATE_NEW, goog.bind(function () {
                this._createNew();
            }, this), false);
        },

        /**
         * @private
         */
        _openFileListen: function () {
            this._dispatcher.addEventListener(EventType.OPEN_FILE, goog.bind(function () {
                this._fileWorker.clickFileReader();
            }, this), false);
        },

        /**
         * @private
         */
        _saveToFileListen: function () {
            this._dispatcher.addEventListener(EventType.SAVE_TO_FILE, goog.bind(function () {
                this._fileWorker.saveToFile(this._model.getData());
            }, this), false);
        },


        /**
         * @private
         */
        _ShapeAddedListen: function () {
            this._dispatcher.addEventListener(EventType.DRAW_SHAPE, goog.bind(function (e) {
                var model = e.detail.shape;
                this._view.drawShape(model);
            }, this), false);
        },

        /**
         * @private
         */
        _addShapesFromFileListen: function () {
            this._dispatcher.addEventListener(EventType.ADD_DATA_FROM_FILE, goog.bind(function (e) {
                this._createNew();
                this._addShapesFromFile(e.detail);
            }, this), false);
        },

        /**
         * @private
         */
        _ShapeMoveAndResizeListen: function () {
            var canvas = this._view.getBody();
            canvas.onmousedown = goog.bind(function (e) {
                var key = this._view.getShapeKeyByClickPos(e);
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
            canvas.ondragstart = function () {
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
                    if (pos.x != shapeModel.getPosition().x || pos.y != shapeModel.getPosition().y) {
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
            else {
                goog.style.setStyle(document.documentElement, "cursor", "default");
            }
        },

        /**
         * @private
         */
        _RedrawShapeListen: function () {
            this._dispatcher.addEventListener(EventType.UPDATE_SHAPE, goog.bind(function (e) {
                this._view.redrawShape(e.detail);
            }, this), false);
        },

        /**
         * @private
         */
        _DeleteClickListen: function () {
            this._dispatcher.addEventListener("keypress", goog.bind(function (e) {
                if (e.keyCode == Constants.KEY_DELETE_CODE && this._view.isShapeSelected()) {
                    var shape = this._model.getShapeByKey(this._view.getIndexOfSelectedShape());
                    this._removeShape(shape);
                }
            }, this), false);
        },

        /**
         * @private
         */
        _RemoveShapeListen: function () {
            this._dispatcher.addEventListener(EventType.REMOVE_SHAPE, goog.bind(function (e) {
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
         * @param detail
         */
        _addShapesFromFile: function (detail) {
            var shapes = detail.data;
            for (var i = 0; i < shapes.length; i++) {
                this._model.addShape(shapes[i]);
                this._view.drawShape(shapes[i]);
            }
        },

        /**
         * @private
         */
        _createNew: function () {
            this._model.removeData();
            this._view.clearScreen();
            this._history.clearHistory();
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
        },
    });
});