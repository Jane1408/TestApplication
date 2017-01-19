goog.provide("TestApplication.EventType");

goog.scope(function () {

    /**
     * @enum {string}
     */
    TestApplication.EventType = {
        UNDO: "undo",
        REDO: "redo",
        ADD_SHAPE: "add shape",
        ACTION: "action",
    }
});