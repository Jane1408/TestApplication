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
            this._button = goog.dom.createElement("button");
            this._button.id = this._id;
            this._button.type = "submit";
            document.body.appendChild(this._button);
            this._button.addEventListener("click", goog.bind(this._buttonClicked, this));
        },
        _buttonClicked: function()
        {
            console.log("Button pressed");
            var event = new CustomEvent(TestApplication.EventType.ACTION, {
                "detail" :{
                    "id" : this._id
                }});
            this._dispatcher.dispatchEvent(event);
        }
    });
});