goog.provide("TestApplication.view.Toolbar");

goog.require("TestApplication.view.Button");
goog.require("TestApplication.ShapeType");
goog.require("TestApplication.ButtonType");
goog.require("goog.dom");

goog.scope(function(){
    const ShapeType = TestApplication.ShapeType;
    const ButtonType = TestApplication.ButtonType;
    /*
     * @constructor
     */
    TestApplication.view.Toolbar = goog.defineClass(null, {
        constructor: function (dispatcher) {
            this._dispatcher = dispatcher;
            this._toolbar = goog.dom.createElement(goog.dom.TagName.DIV);
            this._toolbar.setAttribute("class", ButtonType.TOOLBAR);
            document.body.appendChild(this._toolbar);
            this._buttons = [];
            this._createButtons();
            this._appendButtons();
        },
        
        /**
         * @private
         */
        _createButtons: function () {
            this._buttons.push(new TestApplication.view.Button(ShapeType.ELLIPSE, this._dispatcher));
            this._buttons.push(new TestApplication.view.Button(ShapeType.TRIANGLE, this._dispatcher));
            this._buttons.push(new TestApplication.view.Button(ShapeType.RECTANGLE, this._dispatcher));
            this._buttons.push(new TestApplication.view.Button(ButtonType.UNDO, this._dispatcher));
            this._buttons.push(new TestApplication.view.Button(ButtonType.REDO, this._dispatcher));
        },
        
        /**
         * @private
         */
        _appendButtons: function()
        {
            for (var i = 0; i < this._buttons.length; i++)
            {
                this._toolbar.appendChild(this._buttons[i].getButton());
            }
        }
    });
});