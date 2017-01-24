goog.provide("TestApplication.view.Button");

goog.require("TestApplication.EventType");
goog.require("goog.dom");

goog.scope(function(){
    /**
     * @constructor
    */
    TestApplication.view.Button = goog.defineClass(null, {
        constructor: function(id, dispatcher)
        {   
            this._dispatcher = dispatcher;
            this._id = id;
            /** @private {!Element} */
            this._button = goog.dom.createElement(goog.dom.TagName.BUTTON);
            this._button.setAttribute("class", this._id);
            this._button.type = "submit";
            this._button.addEventListener("click", goog.bind(this._buttonClicked, this));
        },

        /**
         * @private
         */
        _buttonClicked: function()
        {
            var event = new CustomEvent(TestApplication.EventType.ACTION, {
                "detail" :{
                    "id" : this._id
                }});
            this._dispatcher.dispatchEvent(event);
        },

        getButton:function()
        {
            return this._button;
        }

    });
});