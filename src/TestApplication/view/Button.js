goog.provide("TestApplication.view.Button");

goog.require("goog.dom");

goog.scope(function(){
    /**
     * @constructor
    */
    TestApplication.view.Button = goog.defineClass(null, {
        /**
         * @param {TestApplication.Constants} id
         */
        constructor: function(id)
        {
            this._button = goog.dom.createElement("button");
            this._button.id = id;
            this._button.type = "submit";
            document.body.appendChild(this._button);
        }
    });
});