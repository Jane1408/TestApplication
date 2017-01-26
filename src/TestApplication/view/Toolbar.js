goog.provide("TestApplication.view.Toolbar");

goog.require("TestApplication.view.Button");
goog.require("TestApplication.ShapeType");
goog.require("TestApplication.ButtonType");
goog.require("goog.dom");

goog.scope(function(){
    const SHAPE_TYPE = TestApplication.ShapeType;
    const BUTTON_TYPE = TestApplication.ButtonType;
    /*
     * @constructor
     * @param {document} dispatcher
     */
    TestApplication.view.Toolbar = goog.defineClass(null, {
        constructor: function (dispatcher) {
            /** @private {document} */
            this._dispatcher = dispatcher;
            /** @private {Array<TestApplication.view.Button>} */
            this._buttons = [];
            this._createToolbar();
            this._createButtons();
            this._appendButtons();
        },
        
        /**
         * @private
         */
        _createToolbar: function()
        {
            /** @private {Element} */
            this._toolbar = goog.dom.createElement(goog.dom.TagName.DIV);
            this._toolbar.setAttribute("class", BUTTON_TYPE.TOOLBAR);
            document.body.appendChild(this._toolbar);
        },
        
        /**
         * @private
         */
        _createButtons: function () {
            this._buttons.push(new TestApplication.view.Button(SHAPE_TYPE.ELLIPSE, this._dispatcher));
            this._buttons.push(new TestApplication.view.Button(SHAPE_TYPE.TRIANGLE, this._dispatcher));
            this._buttons.push(new TestApplication.view.Button(SHAPE_TYPE.RECTANGLE, this._dispatcher));
            this._buttons.push(new TestApplication.view.Button(BUTTON_TYPE.UNDO, this._dispatcher));
            this._buttons.push(new TestApplication.view.Button(BUTTON_TYPE.REDO, this._dispatcher));
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