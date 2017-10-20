/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const Oups = require("./oups");

class Error extends Oups {
    constructor() {
        const args = Array.from(arguments);
        let message = undefined;
        let data = undefined;
        let error = undefined;
        let code = undefined;

        let index = args.findIndex(e => e instanceof Error);
        if (index != -1) {
            error = args[index];
            args = args.splice(index, 1);
        }

        index = args.findIndex(e => e instanceof Object);
        if (index != -1) {
            data = args[index];
            args = args.splice(index, 1);
        }

        message = args.pop();
        data = args.pop();
    
        super({ message, data, error, code });
    };
}


exports = module.exports = Error;