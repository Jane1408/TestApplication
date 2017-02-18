goog.provide("TestApplication.view.Toolbar");

goog.require("TestApplication.view.Button");
goog.require("TestApplication.ShapeType");
goog.require("TestApplication.ScreenElement");
goog.require("TestApplication.EventType");
goog.require("goog.dom");

goog.scope(function () {
    const ShapeType = TestApplication.ShapeType;
    const ScreenElement = TestApplication.ScreenElement;
    const EventType = TestApplication.EventType;

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
        _createToolbar: function () {
            /** @private {Element} */
            this._toolbar = goog.dom.createElement(goog.dom.TagName.DIV);
            this._toolbar.setAttribute("class", ScreenElement.TOOLBAR);
            document.body.appendChild(this._toolbar);
        },

        /**
         * @private
         */
        _createButtons: function () {
            this._buttons.push(new TestApplication.view.Button(ShapeType.ELLIPSE, EventType.ADD_SHAPE));
            this._buttons.push(new TestApplication.view.Button(ShapeType.TRIANGLE, EventType.ADD_SHAPE));
            this._buttons.push(new TestApplication.view.Button(ShapeType.RECTANGLE, EventType.ADD_SHAPE));
            this._buttons.push(new TestApplication.view.Button(ScreenElement.UNDO, EventType.UNDO));
            this._buttons.push(new TestApplication.view.Button(ScreenElement.REDO, EventType.REDO));
            this._buttons.push(new TestApplication.view.Button(ScreenElement.OPEN, EventType.OPEN_FILE));
            this._buttons.push(new TestApplication.view.Button(ScreenElement.NEW, EventType.CREATE_NEW));
            this._buttons.push(new TestApplication.view.Button(ScreenElement.SAVE, EventType.SAVE_TO_FILE));
        },

        /**
         * @private
         */
        _appendButtons: function () {
            for (var i = 0; i < this._buttons.length; i++) {
                this._toolbar.appendChild(this._buttons[i].getObject());
            }
        },
    });
});