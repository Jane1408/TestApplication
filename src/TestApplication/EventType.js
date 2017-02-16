goog.provide("TestApplication.EventType");

    /**
     * @enum {string}
     */
    TestApplication.EventType = {
        UNDO: "undo",
        REDO: "redo",
        ADD_SHAPE: "addShape",
        SHAPE_ADDED: "shapeAdded",
        SHAPE_REMOVED: "shapeRemoved",
        SHAPE_MOVE: "shapeMove",
        UPDATE_SHAPE: "updateShape",
        REMOVE_SHAPE: "removeShape",
        ACTION: "action",
        CLEAR_SCREEN: "clearScreen",
        ADD_DATA_FROM_FILE: "addDataFromFile"
    };
