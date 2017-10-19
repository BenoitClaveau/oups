/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const i18n = require("i18n");

class RuntimeError extends Error {
    constructor(message) {
        super(options.message || "Error");
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        if (options.stack) this.stack = options.stack;
        if (options.fileName) this.fileName = options.fileName;
        if (options.lineNumber) this.lineNumber = options.lineNumber;
        if (options.columnNumber) this.columnNumber = options.columnNumber;
        //if (options.request) this.request = options.request;
        
        if (!options.data) this.data = {};
        else if (options.data instanceof Array) this.data = { array: options.data };
        else this.data = options.data;
        
        // this.headers = options.headers || {};
        // this.headers["Content-Type"] = this.headers["Content-Type"] || "application/json";
        
        // this.statusCode = options.statusCode || 500;
	};
}


exports = module.exports = RuntimeError;