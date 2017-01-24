goog.provide("TestApplication.EventType");

    /**
     * @enum {string}
     */
    TestApplication.EventType = {
        UNDO: "undo",
        REDO: "redo",
        ADD_SHAPE: "add shape",
        SHAPE_ADDED: "shape added",
        SHAPE_REMOVED: "shape removed",
        SHAPE_MOVE: "shape move",
        REDRAW_SHAPE: "redraw shape",
        ACTION: "action",
    };
