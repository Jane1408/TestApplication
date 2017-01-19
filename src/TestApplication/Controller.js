goog.provide("TestApplication.Controller");

goog.require("TestApplication.view.View");
goog.require("TestApplication.view.Toolbar");
goog.require("TestApplication.model.Model");
goog.require("TestApplication.History");
goog.require("TestApplication.commands.AddShapeCommand");


goog.scope(function(){
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
                if (e.detail.id == "undo")
                {
                    this._undo();
                }
                else if (e.detail.id == "redo")
                {
                    this._redo();
                }
                else
                {
                    this._addShape(e.detail.id);
                }
            },this),false);


        },
        _addShape: function(type)
        {
            var command = new TestApplication.commands.AddShapeCommand(this._model, type);
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