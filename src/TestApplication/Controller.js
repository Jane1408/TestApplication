goog.provide("TestApplication.Controller");

goog.require("TestApplication.view.View");
goog.require("TestApplication.view.Toolbar");
goog.require("TestApplication.model.Model");
goog.require("TestApplication.History");
goog.require("TestApplication.commands.AddShapeCommand");
goog.require("TestApplication.commands.MoveShapeCommand");
goog.require("TestApplication.ButtonType");

goog.scope(function(){
    const ButtonType = TestApplication.ButtonType;
    /**
     * @constructor
     */
    TestApplication.Controller = goog.defineClass(null, {
        constructor: function()
        {
            this._dispatcher = document;
            /**@private {TestApplication.model.Model}*/
            this._model = new TestApplication.model.Model();
            /**@private {TestApplication.view.Toolbar}*/
            this._toolbar = new TestApplication.view.Toolbar(this._dispatcher);
            /**@private {TestApplication.History}*/
            this._history = new TestApplication.History();
            /**@private {TestApplication.view.View}*/
            this._view = new TestApplication.view.View();

            this._dispatcher.addEventListener(TestApplication.EventType.ACTION, goog.bind(function (e) {
                if (e.detail.id == ButtonType.UNDO) {
                    this._undo();
                }
                else if (e.detail.id == ButtonType.REDO) {
                    this._redo();
                }
                else {
                    this._addShape(e.detail.id);
                }
            },this),false);

            this._dispatcher.addEventListener(TestApplication.EventType.SHAPE_ADDED, goog.bind(function (e) {
                this._view.drawShape(e.detail);
            },this),false);

            this._dispatcher.addEventListener(TestApplication.EventType.REDRAW_SHAPE, goog.bind(function (e) {
                this._view.redrawShape(e.detail);
            },this),false);

            var canvas = this._view.getBody();
            canvas.onmousedown = goog.bind(function (e) {
                var key = this._model.getShapeKey(e);
                if (key) {
                    var shapeModel = this._model.getShapeByKey(key);
                    this._view.trySelectShape(key);
                    var shift = new goog.math.Coordinate( e.pageX - shapeModel.getPosition().x, e.pageY - shapeModel.getPosition().y);
                    var pos = new goog.math.Coordinate( e.pageX - shift.x, e.pageY - shift.y);
                    document.onmousemove = goog.bind(function(e) {
                        pos = new goog.math.Coordinate( e.pageX - shift.x, e.pageY - shift.y);
                        this._view.moveShapeView(key, pos);
                    },this);

                    canvas.onmouseup = goog.bind(function() {
                        console.log("1!");
                        this._moveShape(shapeModel, pos);
                        
                        document.onmousemove = null;
                        canvas.onmousedowm = null;
                    },this);
                }
                else {
                    if (this._view.isShapeSelected()) this._view.deselect();
                }
            }, this);
            
        },

        /**
         * @param {string} type
         * @private
         */
        _addShape: function(type)
        {
            var command = new TestApplication.commands.AddShapeCommand(this._model, type);
            this._history.addCommand(command);
        },

        /**
         * @param {TestApplication.model.ShapeModel} shape
         * @private
         */
        _moveShape: function(shape, pos)
        {
            console.log("2!");
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