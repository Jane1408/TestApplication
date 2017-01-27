goog.provide("TestApplication.Controller");

goog.require("TestApplication.view.View");
goog.require("TestApplication.view.Toolbar");
goog.require("TestApplication.model.Model");
goog.require("TestApplication.History");
goog.require("TestApplication.commands.AddShapeCommand");
goog.require("TestApplication.commands.MoveShapeCommand");
goog.require("TestApplication.commands.RemoveShapeCommand");
goog.require("TestApplication.ButtonType");

goog.scope(function(){
    const BUTTON_TYPE = TestApplication.ButtonType;
    /**
     * @constructor
     */
    TestApplication.Controller = goog.defineClass(null, {
        constructor: function()
        {
            /**@private {document}*/
            this._dispatcher = document;
            /**@private {TestApplication.model.Model}*/
            this._model = new TestApplication.model.Model();
            /**@private {TestApplication.view.Toolbar}*/
            this._toolbar = new TestApplication.view.Toolbar(this._dispatcher);
            /**@private {TestApplication.History}*/
            this._history = new TestApplication.History();
            /**@private {TestApplication.view.View}*/
            this._view = new TestApplication.view.View();

            this._addToolbarActionListen();
            this._addShapeAddedListen();
            this._addShapeMoveListen();
            this._addRedrawShapeListen();
            this._addDeleteClickListen();
            this._addRemoveShapeListen();



        },

        /**
         * @private
         */
        _addToolbarActionListen: function()
        {
            this._dispatcher.addEventListener(TestApplication.EventType.ACTION, goog.bind(function (e) {
                if (e.detail.id == BUTTON_TYPE.UNDO) {
                    this._undo();
                }
                else if (e.detail.id == BUTTON_TYPE.REDO) {
                    this._redo();
                }
                else {
                    this._addShape(e.detail.id);
                }
            },this),false);
        },

        /**
         * @private
         */
        _addShapeAddedListen: function()
        {
            this._dispatcher.addEventListener(TestApplication.EventType.SHAPE_ADDED, goog.bind(function (e) {
                this._view.drawShape(e.detail);
            },this),false);
        },

        /**
         * @private
         */
        _addShapeMoveListen: function()
        {
            var canvas = this._view.getBody();
            canvas.onmousedown = goog.bind(function (e) {
                var key = this._view.getShapeIndexByClickPos(e);
                if (key) {
                    this._moveListen(canvas, key, e);
                }
                else if (this._view.isShapeSelected() && this._view.checkResizePointsOnclick(e)){
                    
                }
                else {
                    this._view.deselect();
                }
            }, this);
        },
        
        /**
         * @private
         */
        _moveListen: function(canvas, key, e)
        {
            var shapeModel = this._model.getShapeByKey(key);
            this._view.selectShape(key);
            var shift = new goog.math.Coordinate( e.pageX - shapeModel.getPosition().x, e.pageY - shapeModel.getPosition().y);
            var pos = new goog.math.Coordinate( e.pageX - shift.x, e.pageY - shift.y);
            document.onmousemove = goog.bind(function(e) {
                pos = new goog.math.Coordinate( e.pageX - shift.x, e.pageY - shift.y);
                this._view.moveShapeView(key, pos);
            },this);

            canvas.onmouseup = goog.bind(function() {
                this._moveShape(shapeModel, pos);
                document.onmousemove = null;
                canvas.onmousedowm = null;
            },this);
        },

        /**
         * @private
         */
        _addRedrawShapeListen: function()
        {
            this._dispatcher.addEventListener(TestApplication.EventType.REDRAW_SHAPE, goog.bind(function (e) {
                this._view.redrawShape(e.detail);
            },this),false);
        },

        /**
         * @private
         */
        _addDeleteClickListen: function() {
            this._dispatcher.addEventListener("keypress", goog.bind(function (e) {
                if (e.keyCode == 46 && this._view.isShapeSelected()) {
                    var shape = this._model.getShapeByKey(this._view.getIndexOfSelectedShape());
                    this._removeShape(shape);
                }
            }, this), false);
        },

        /**
         * @private
         */
        _addRemoveShapeListen: function()
        {
            this._dispatcher.addEventListener(TestApplication.EventType.REMOVE_SHAPE, goog.bind(function (e) {
                this._view.removeShape(e.detail);
            },this),false);
        },

        /**
         * @private
         * @param {string} type
         */
        _addShape: function(type)
        {
            var command = new TestApplication.commands.AddShapeCommand(this._model, type);
            this._history.addCommand(command);
        },

        /**
         * @private
         * @param {TestApplication.model.ShapeModel} shape
         */
        _removeShape: function(shape)
        {
            var command = new TestApplication.commands.RemoveShapeCommand(this._model, shape);
            this._history.addCommand(command);
        },

        /**
         * @private
         * @param {TestApplication.model.ShapeModel} shape
         * @param {goog.math.Coordinate} pos
         */
        _moveShape: function(shape, pos)
        {
            var command = new TestApplication.commands.MoveShapeCommand(shape, pos);
            this._history.addCommand(command);
        },

        /**
         * @private
         */
        _undo:function()
        {
            this._history.undo();
        },

        /**
         * @private
         */
        _redo:function()
        {
            this._history.redo();
        }
    });
});