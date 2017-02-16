goog.provide("TestApplication.view.Toolbar");

goog.require("TestApplication.view.Button");
goog.require("TestApplication.ShapeType");
goog.require("TestApplication.ScreenElement");
goog.require("goog.dom");

goog.scope(function(){
    const SHAPE_TYPE = TestApplication.ShapeType;
    const SCREEN_ELEMENT = TestApplication.ScreenElement;
    /**
     * @constructor
     */
    TestApplication.view.Toolbar = goog.defineClass(null, {
        constructor: function () {
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
            this._toolbar.setAttribute("class", SCREEN_ELEMENT.TOOLBAR);
            document.body.appendChild(this._toolbar);
        },
        
        /**
         * @private
         */
        _createButtons: function () {
            this._buttons.push(new TestApplication.view.Button(SHAPE_TYPE.ELLIPSE));
            this._buttons.push(new TestApplication.view.Button(SHAPE_TYPE.TRIANGLE));
            this._buttons.push(new TestApplication.view.Button(SHAPE_TYPE.RECTANGLE));
            this._buttons.push(new TestApplication.view.Button(SCREEN_ELEMENT.UNDO));
            this._buttons.push(new TestApplication.view.Button(SCREEN_ELEMENT.REDO));
            this._buttons.push(new TestApplication.view.Button(SCREEN_ELEMENT.OPEN));
            this._buttons.push(new TestApplication.view.Button(SCREEN_ELEMENT.NEW));
            this._buttons.push(new TestApplication.view.Button(SCREEN_ELEMENT.SAVE));
        },
        
        /**
         * @private
         */
        _appendButtons: function()
        {
            for (var i = 0; i < this._buttons.length; i++)
            {
                this._toolbar.appendChild(this._buttons[i].getObject());
            }
        },
    });
});