goog.provide("TestApplication.view.Toolbar");

goog.require("TestApplication.view.Button");
goog.require("TestApplication.Constants");
goog.require("goog.dom");

goog.scope(function(){
    var Constants = TestApplication.Constants;
    /**
     * @constructor
     */
    TestApplication.view.Toolbar = goog.defineClass(null, {
        constructor: function () {
            this._toolbar = goog.dom.createElement(goog.dom.TagName.DIV);
            this._toolbar.id = Constants.TOOLBAR;
            document.body.appendChild(this._toolbar);
            this._buttons = [];
            this._createButtons();
        },
        _createButtons: function () {
            this._buttons.push(new TestApplication.view.Button(Constants.CIRCLE));
            this._buttons.push(new TestApplication.view.Button(Constants.TRIANGLE));
            this._buttons.push(new TestApplication.view.Button(Constants.SQUARE));
            this._buttons.push(new TestApplication.view.Button(Constants.UNDO));
            this._buttons.push(new TestApplication.view.Button(Constants.REDO));
        },
        
    });
});