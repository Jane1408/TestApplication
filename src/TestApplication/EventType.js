goog.provide("TestApplication.EventType");

    /**
     * @enum {string}
     */
    TestApplication.EventType = {
        UNDO: "undo",
        REDO: "redo",
        ADD_SHAPE: "addShape",
        DRAW_SHAPE: "drawShape",
        SHAPE_REMOVED: "shapeRemoved",
        SHAPE_MOVE: "shapeMove",
        UPDATE_SHAPE: "updateShape",
        REMOVE_SHAPE: "removeShape",
        CLEAR_SCREEN: "clearScreen",
        OPEN_FILE: "openFile",
        CREATE_NEW: "createNew",
        SAVE_TO_FILE: "saveToFile",
        ADD_DATA_FROM_FILE: "addDataFromFile"
    };
