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
        REDRAW_SHAPE: "redrawShape",
        ACTION: "action",
    };
