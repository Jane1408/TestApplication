goog.provide("TestApplication.Controller");

goog.require("TestApplication.view.View");
goog.require("TestApplication.view.Toolbar");
goog.require("TestApplication.model.ShapeCollection");
goog.require("TestApplication.History");
goog.require("TestApplication.FileWorker");
goog.require("TestApplication.commands.AddShapeCommand");
goog.require("TestApplication.commands.MoveShapeCommand");
goog.require("TestApplication.commands.ResizeShapeCommand");
goog.require("TestApplication.commands.RemoveShapeCommand");
goog.require("goog.events.KeyCodes");
goog.require("goog.events.EventType");

goog.scope(function () {
    const EventType = TestApplication.EventType;
    /**
     * @constructor
     */
    TestApplication.Controller = goog.defineClass(null, {
        constructor: function () {
            this._dispatcher = document;
            /**@private {TestApplication.model.ShapeCollection}*/
            this._model = new TestApplication.model.ShapeCollection();
            /**@private {TestApplication.view.Toolbar}*/
            this._toolbar = new TestApplication.view.Toolbar();
            /**@private {TestApplication.History}*/
            this._history = new TestApplication.History();
            /**@private {TestApplication.view.View}*/
            this._view = new TestApplication.view.View();
            /**@private {TestApplication.FileWorker}*/
            this._fileWorker = new TestApplication.FileWorker();
            this._addListeners();
        },

        /**
         * @private
         */
        _addListeners: function () {
            this._addShapeListener();
            this._undoListener();
            this._redoListener();
            this._createNewFileListener();
            this._openFileListener();
            this._saveToFileListener();
            this._shapeAddedListener();
            this._moveShapeListener();
            this._resizeShapeListener();
            this._redrawShapeListener();
            this._deleteClickListener();
            this._removeShapeListener();
            this._addShapesFromFileListener();
        },

        /**
         * @private
         */
        _addShapeListener: function () {
            this._dispatcher.addEventListener(EventType.ADD_SHAPE, goog.bind(function (e) {
                this._addShape(e.detail.id);
            }, this), false);
        },

        /**
         * @private
         */
        _undoListener: function () {
            this._dispatcher.addEventListener(EventType.UNDO, goog.bind(function () {
                this._undo();
            }, this), false);
        },

        /**
         * @private
         */
        _redoListener: function () {
            this._dispatcher.addEventListener(EventType.REDO, goog.bind(function () {
                this._redo();
            }, this), false);
        },

        /**
         * @private
         */
        _createNewFileListener: function () {
            this._dispatcher.addEventListener(EventType.CREATE_NEW, goog.bind(function () {
                this._createNew();
            }, this), false);
        },

        /**
         * @private
         */
        _openFileListener: function () {
            this._dispatcher.addEventListener(EventType.OPEN_FILE, goog.bind(function () {
                this._fileWorker.clickFileReader();
            }, this), false);
        },

        /**
         * @private
         */
        _saveToFileListener: function () {
            this._dispatcher.addEventListener(EventType.SAVE_TO_FILE, goog.bind(function () {
                this._fileWorker.saveToFile(this._model.getShapesModel());
            }, this), false);
        },


        /**
         * @private
         */
        _shapeAddedListener: function () {
            this._dispatcher.addEventListener(EventType.DRAW_SHAPE, goog.bind(function (e) {
                var model = e.shape;
                this._view.drawShape(e.detail.shape);
            }, this), false);
        },

        /**
         * @private
         */
        _addShapesFromFileListener: function () {
            this._dispatcher.addEventListener(EventType.ADD_DATA_FROM_FILE, goog.bind(function (e) {
                this._createNew();
                this._addShapesFromFile(e.detail.shapesModel);
            }, this), false);
        },

        /**
         * @private
         */
        _moveShapeListener: function () {
            this._dispatcher.addEventListener(EventType.MOVE_SHAPE, goog.bind(function (e) {
                var shape = this._model.getShapeById(e.detail.id);
                this._moveShape(shape, e.detail.pos);
            }, this), false);
        },

        /**
         * @private
         */
        _resizeShapeListener: function () {
            this._dispatcher.addEventListener(EventType.RESIZE_SHAPE, goog.bind(function (e) {
                var shape = this._model.getShapeById(e.detail.id);
                this._resizeShape(shape, e.detail.pos, e.detail.size);
            }, this), false);
        },

        /**
         * @private
         */
        _redrawShapeListener: function () {
            this._dispatcher.addEventListener(EventType.UPDATE_SHAPE, goog.bind(function (e) {
                this._view.redrawShape(e.detail.id);
            }, this), false);
        },

        /**
         * @private
         */
        _deleteClickListener: function () {
            this._dispatcher.addEventListener(goog.events.EventType.KEYPRESS, goog.bind(function (e) {
                if (e.keyCode == goog.events.KeyCodes.DELETE && this._view.isShapeSelected()) {
                    var shape = this._model.getShapeById(this._view.getIdOfSelectedShape());
                    this._removeShape(shape);
                }
            }, this), false);
        },

        /**
         * @private
         */
        _removeShapeListener: function () {
            this._dispatcher.addEventListener(EventType.REMOVE_SHAPE, goog.bind(function (e) {
                this._view.removeShape(e.detail.shape);
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
         * @param shapesModel
         */
        _addShapesFromFile: function (shapesModel) {
            var shapes = shapesModel;
            for (var i = 0; i < shapes.length; i++) {
                this._model.addShape(shapes[i]);
                this._view.drawShape(shapes[i]);
            }
        },

        /**
         * @private
         */
        _createNew: function () {
            this._model.removeShapesModel();
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
        }
    });
});