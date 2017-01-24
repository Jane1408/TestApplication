goog.provide("TestApplication.History");

goog.scope(function()
{
    /**
     * @constructor
     */
    TestApplication.History = goog.defineClass(null, {
        constructor: function()
        {
            /**@private {Array}*/
            this._commands = [];

            /**@private {number}*/
            this._currentCommsnd = 0;
        },

        /**
         * @public
         * @param command
         */
        addCommand: function(command)
        {
            if (this._currentCommsnd < this._commands.length - 1)
            {
                this._commands.splice(this._currentCommsnd);
            }
            goog.array.insert(this._commands, command);
            command.execute();
            ++this._currentCommsnd;
        },

        /**
         * @public
         */
        undo: function()
        {
            if (this._currentCommsnd > 0)
            {
                this._commands[--this._currentCommsnd].unExecute();
            }
        },

        /**
         * @public
         */
        redo: function()
        {
            if (this._currentCommsnd < this._commands.length)
            {
                this._commands[this._currentCommsnd++].execute();
            }
        }
    })
});