goog.provide("TestApplication.FileWorker");

goog.scope(function () {
    /**
     * @constructor
     */
    TestApplication.FileWorker = goog.defineClass(null, {
        constructor: function () {
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
                    var url = event.target.result;
                    console.log(url);
                }, this);
                reader.readAsText(file);
            }
            event.target.value = "";
        },

        saveToFile: function (data) {
            var shapeArr = [];
            for (var i = 0; i < data.length; i++)
            {
                var type = data[i].getType();
                var position = data[i].getPosition();
                var size = data[i].getSize();
                shapeArr.push({"type": type, "position": [position.x , position.y], "size": [size.width, size.height]});
            }
            var dataArr = [{"shapes" : shapeArr}];
            var json = JSON.stringify(dataArr);

            var textFileAsBlob = new Blob([json], {type: 'text/plain'});
            var fileNameToSaveAs = "new.json";

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
        }
    })
});