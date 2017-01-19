goog.provide("Application");

goog.require("TestApplication.Controller");

/**
 * @export
 */
Application.start = function()
{
    new TestApplication.Controller();

};
