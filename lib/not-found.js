/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const Error = require("./error");

class NotFoundError extends Error {
    constructor() {
        let message, data = {}, error;
        
        let argv = Array.from(arguments);
        let index = argv.findIndex(e => e instanceof Error);
        index >= 0 && (error = argv.splice(index, 1).shift());

        index = argv.findIndex(e => e instanceof Object);
        index >= 0 && (data = argv.splice(index, 1).shift());

        message = argv.shift();

        if (!message) message = "NotFoundError.";
        else message += " is not found."
        super(message, data, error);
    };
}

exports = module.exports = NotFoundError;