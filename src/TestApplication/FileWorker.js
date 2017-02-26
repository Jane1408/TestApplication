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

        clickFileReader: function () {
            this._fileReader.click();
        },

        /**
         * @param{Array<TestApplication.model.ShapeModel>} data
         */
        saveToFile: function (data) {
            var json = this._writeJSON(data);

            var textFileAsBlob = new Blob([json], {type: 'application/json'});
            var fileNameToSaveAs = "new_ShapeManager.json";

            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";

            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = function (event) {
                document.body.removeChild(event.target);
            };
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
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
            this._fileReader.accept = "application/json";
            goog.style.setStyle(this._fileReader, "display", "none");
            document.body.appendChild(this._fileReader);
        },

        /**
         * @private
         */
        _openFile: function (event) {
            var files = event.target.files;
            for (var i = 0, file; file = files[i]; i++) {
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
         * @private
         * @param{Array<TestApplication.model.ShapeModel>} data
         * @return {string}
         */
        _writeJSON: function (data) {
            var dataArr = [];
            for (var i = 0; i < data.length; i++) {
                var type = data[i].getType();
                var position = data[i].getPosition();
                var size = data[i].getSize();
                dataArr.push({"type": type, "position": [position.x, position.y], "size": [size.width, size.height]});
            }
            return JSON.stringify(dataArr);
        },

        /**
         * @private
         * @param {string} json
         */
        _readJSON: function (json) {
            var data = JSON.parse(json);
            var shapesModel = [];
            for (var i = 0; i < data.length; i++) {
                var pos = new goog.math.Coordinate(data[i].position[0], data[i].position[1]);
                var size = new goog.math.Size(data[i].size[0], data[i].size[1]);
                var shape = new TestApplication.model.ShapeModel(data[i].type);
                shape.setPosition(pos);
                shape.setSize(size);
                shapesModel.push(shape);
            }

            var event = new CustomEvent(TestApplication.EventType.ADD_DATA_FROM_FILE, {
                "detail" : {
                    "shapesModel": shapesModel
                }
            });
            this._dispatcher.dispatchEvent(event);
        }
    })
});