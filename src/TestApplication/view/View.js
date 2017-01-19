goog.provide("TestApplication.view.View");

goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.math");

goog.scope(function() {
    /**
     * @constructor
     */
    TestApplication.view.View = goog.defineClass(null, {
        constructor: function () {
            this._shapes = [];

            /**@private {number}*/
            this._width = TestApplication.view.View.CANVAS_WIDTH;
            /**@private {number}*/
            this._height = TestApplication.view.View.CANVAS_HEIGHT;
            this._body = goog.dom.createElement(goog.dom.TagName.DIV);
            this._body.id = "canvas";
            
            goog.style.setSize(this._body, new goog.math.Size(this._width, this._height));
            document.body.appendChild(this._body);


        },
        statics:
        {
            CANVAS_WIDTH: 700,
            CANVAS_HEIGHT: 500,
        }

    });
});