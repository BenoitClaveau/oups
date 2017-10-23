/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const Error = require("./error");

class HttpError extends Error {
    constructor(statusCode, message, data, error) {
        super({ message, data, error });
        this.statusCode = statusCode;
    };
}


exports = module.exports = Error;