goog.provide("TestApplication.History");

goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.History = goog.defineClass(null, {
        constructor: function()
        {
            /**@private {Array<TestApplication.commands.Command>}*/
            this._commands = [];

            /**@private {number}*/
            this._currentCommand = 0;
        },

        /**
         * @param command
         */
        addCommand: function(command)
        {
            if (this._currentCommand < this._commands.length - 1)
            {
                this._commands.splice(this._currentCommand);
            }
            this._commands.push(command);
            command.execute();
            ++this._currentCommand;
        },

        /**
         * @public
         */
        undo: function()
        {
            if (this._currentCommand > 0)
            {
                this._commands[--this._currentCommand].unExecute();
            }
        },

        /**
         * @public
         */
        redo: function()
        {
            if (this._currentCommand < this._commands.length)
            {
                this._commands[this._currentCommand++].execute();
            }
        }
    })
});