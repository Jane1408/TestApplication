goog.provide("TestApplication.FileWorker");

goog.require("TestApplication.model.ShapeModel");

goog.scope(function () {
    /**
     * @constructor
     */
    TestApplication.FileWorker = goog.defineClass(null, {
        constructor: function () {
            this._dispatcher = document;
            this._createFileReader();
            this._addChangeListen();
        },

        /**
         * @private
         */
        _addChangeListen: function () {
            this._fileReader.addEventListener("change", goog.bind(function (e) {
                this._openFile(e);
            }, this), false);
        },

        /**
         * @private
         */
        _createFileReader: function () {
            /** @private {Element}*/
            this._fileReader = document.createElement(goog.dom.TagName.INPUT);
            this._fileReader.type = "file";
            goog.style.setStyle(this._fileReader, "display", "none");
            document.body.appendChild(this._fileReader);
        },

        clickFileReader: function () {
            this._fileReader.click();
        },

        /**
         * @private
         */
        _openFile: function (event) {
            var files = event.target.files;
            for (var i = 0, file; file = files[i]; i++) {
                if (!file.type.match('text.*')) {
                    continue;
                }
                var reader = new FileReader();
                reader.onload = goog.bind(function (event) {
                    var data = event.target.result;
                    this._readJSON(data);
                }, this);
                reader.readAsText(file);
            }
            event.target.value = "";
        },

        /**
         * @param{Array<TestApplication.model.ShapeModel>} data
         */
        saveToFile: function (data) {
            var json = this._writeJSON(data);

            var textFileAsBlob = new Blob([json], {type: 'text/plain'});
            var fileNameToSaveAs = "new.txt";

            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();

            function destroyClickedElement(event) {
                document.body.removeChild(event.target);
            }
        },

        /**
         * @private
         * @param{Array<TestApplication.model.ShapeModel>} data
         * @return {string}
         */
        _writeJSON: function (data) {
            var shapeArr = [];
            for (var i = 0; i < data.length; i++) {
                var type = data[i].getType();
                var position = data[i].getPosition();
                var size = data[i].getSize();
                shapeArr.push({"type": type, "position": [position.x, position.y], "size": [size.width, size.height]});
            }
            var dataArr = [{"shapes": shapeArr}];
            return JSON.stringify(dataArr);
        },

        /**
         * @private
         * @param {string} json
         */
        _readJSON: function (json) {
            var data = JSON.parse(json);
            var shapeModels = [];
            for (var i = 0; i < data[0].shapes.length; i++) {
                var pos = new goog.math.Coordinate(data[0].shapes[i].position[0], data[0].shapes[i].position[1]);
                var size = new goog.math.Size(data[0].shapes[i].size[0], data[0].shapes[i].size[1]);
                var shape = new TestApplication.model.ShapeModel(data[0].shapes[i].type);
                shape.setPosition(pos);
                shape.setSize(size);
                shapeModels.push(shape);
            }

            var event = new CustomEvent(TestApplication.EventType.ADD_DATA_FROM_FILE, {
                "detail": {
                    "shapes": shapeModels
                }
            });
            this._dispatcher.dispatchEvent(event);
        },

    })
});