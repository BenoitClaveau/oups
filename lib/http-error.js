/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const Error = require("./error");

class HttpError extends Error {
    constructor(statusCode = 500, message, data, error) {
        super(message, data, error);
        this.statusCode = parseInt(statusCode);
    };
    
    toString() {
        
        return `${this.name}: ${this.message}
statusCode: ${this.statusCode}
${this.stackToString()}`
    };
}

exports = module.exports = HttpError;