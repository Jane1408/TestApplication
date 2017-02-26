goog.provide("TestApplication.EventType");

/**
 * @enum {string}
 */
TestApplication.EventType = {
    UNDO: "undo",
    REDO: "redo",
    ADD_SHAPE: "add shape",
    DRAW_SHAPE: "draw shape",
    SHAPE_REMOVED: "shape removed",
    MOVE_SHAPE: "move shape",
    RESIZE_SHAPE: "resize shape",
    UPDATE_SHAPE: "update shape",
    REMOVE_SHAPE: "remove shape",
    CLEAR_SCREEN: "clear screen",
    OPEN_FILE: "open file",
    CREATE_NEW: "create new",
    SAVE_TO_FILE: "save to file",
    ADD_DATA_FROM_FILE: "add data from file"
};
