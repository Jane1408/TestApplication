goog.provide("TestApplication.view.TriangleView");

goog.require("TestApplication.view.ShapeView");
goog.require("goog.style");

goog.scope(function () {
    /**
     * @constructor
     * @param {TestApplication.model.ShapeModel} model
     * @extends {TestApplication.view.ShapeView}
     */
    TestApplication.view.TriangleView = goog.defineClass(TestApplication.view.ShapeView, {
        constructor: function (model) {
            goog.base(this, model);

            this._shape = goog.dom.createElement(goog.dom.TagName.DIV);
            this._shape.setAttribute("class", "triangle-shape");
            goog.style.setPosition(this._shape, this.getPosition());
            this._createInteriorShape();
        },

        /**
         * @inheritDoc
         */
        getElement: function () {
            return this._shape;
        },

        /**
         * @inheritDoc
         */
        redraw: function () {
            goog.style.setPosition(this._shape, this.getPosition());
            this.resize(this.getSize());
        },

        /**
         * @inheritDoc
         */
        move: function (pos) {
            goog.style.setPosition(this._shape, pos);
        },

        /**
         * @inheritDoc
         */
        resize: function (size) {
            goog.style.setStyle(this._shape, "border-left", size.width / 2 + 2 + "px solid transparent");
            goog.style.setStyle(this._shape, "border-right", size.width / 2 + 2 + "px solid transparent");
            goog.style.setStyle(this._shape, "border-bottom", size.height + 3.5 + "px solid #ffaa00");

            goog.style.setStyle(this._interior, "border-left", size.width / 2 + "px solid transparent");
            goog.style.setStyle(this._interior, "border-right", size.width / 2 + "px solid transparent");
            goog.style.setStyle(this._interior, "border-bottom", size.height + "px solid #ffff00");
            goog.style.setPosition(this._interior, new goog.math.Coordinate(-size.width / 2, 2));
        },

        /**
         * @inheritDoc
         */
        hitTest: function (clickPos) {
            var topLeft = this.getPosition();
            var bottomRight = new goog.math.Coordinate(this.getSize().width + topLeft.x, this.getSize().height + topLeft.y);
            var firstCondition = clickPos.y > (2 * (topLeft.y - bottomRight.y) * (clickPos.x - topLeft.x) / (bottomRight.x - topLeft.x) + bottomRight.y);
            var secondCondition = clickPos.y > (2 * (topLeft.y - bottomRight.y) * (clickPos.x - bottomRight.x) / (topLeft.x - bottomRight.x) + bottomRight.y);
            var thirdCondition = clickPos.y < bottomRight.y;
            return (firstCondition && secondCondition && thirdCondition);
        },

        /**
         * @private
         */
        _createInteriorShape: function () {
            /** @private {Element}*/
            this._interior = goog.dom.createElement(goog.dom.TagName.DIV);
            this._interior.setAttribute("class", "interior");
            this._shape.appendChild(this._interior);
            this.resize(this.getSize());
        }
    });
});



