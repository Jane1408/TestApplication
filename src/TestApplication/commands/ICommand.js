goog.provide("TestApplication.commands.ICommand");

goog.scope(function () {
    /**
     * @constructor
     */
    TestApplication.commands.ICommand = goog.defineClass(null, {
        constructor: function () {
        },

        /**
         * @virtual
         * @public
         */
        execute: function () {
        },

        /**
         * @virtual
         * @public
         */
        unExecute: function () {
        }
    })
});