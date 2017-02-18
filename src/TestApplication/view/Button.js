goog.provide("TestApplication.view.Button");

goog.require("goog.dom");

goog.scope(function () {
    /**
     * @constructor
     * @param {string} id
     * @param {string} eventType
     */
    TestApplication.view.Button = goog.defineClass(null, {
        constructor: function (id, eventType) {
            this._dispatcher = document;
            /** @private {string} */
            this._id = id;
            /** @private {string}*/
            this._eventType = eventType;
            this._createButton();
            this._button.addEventListener("click", goog.bind(this._buttonClicked, this));
            goog.style.setStyle(this._button, "cursor", "pointer");
        },

        /**
         * @private
         */
        _createButton: function () {
            /** @private {Element} */
            this._button = goog.dom.createElement(goog.dom.TagName.BUTTON);
            this._button.setAttribute("class", this._id);
            this._button.type = "submit";
        },

        /**
         * @private
         */
        _buttonClicked: function () {
            var event = new CustomEvent(this._eventType, {
                "detail": {
                    "id": this._id
                }
            });
            this._dispatcher.dispatchEvent(event);
        },

        /**
         * @return {Element}
         */
        getObject: function () {
            return this._button;
        },
    });
});