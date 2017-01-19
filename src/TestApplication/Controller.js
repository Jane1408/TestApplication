goog.provide("TestApplication.Controller");

goog.require("TestApplication.view.Toolbar");

goog.scope(function(){
    /**
     * @constructor
     */
    TestApplication.Controller = goog.defineClass(null, {
        constructor: function()
        {
            this._toolbar = new TestApplication.view.Toolbar();
        }
    });
});