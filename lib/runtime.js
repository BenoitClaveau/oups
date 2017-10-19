/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const i18n = require("i18n");

class RuntimeError extends Error {
    constructor({message, template, data, error, code}) {
        super();
        if (message) this.message = message;

        if (!message && template) {
            const tpl = new Function("data", `return \`${template}\`;`) //TODO translate template
            this.message = tpl(data);
        }
        if (error) {
            if (!message && error instanceof RuntimeError) {
                Object.assign(this, error);
                return;
            }
            if (!message && error instanceof Error) { //copy error
                this.message = error.message;
                if (error.stack) this.stack = error.stack;
                if (error.fileName) this.fileName = error.fileName;
                if (error.lineNumber) this.lineNumber = error.lineNumber;
                if (error.columnNumber) this.columnNumber = error.columnNumber;
            }
            else {
                this.ancestor = error; //error is an ancestor
            }
        }
        else if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
        this.stack = this.stack ? this.stack.split('\n').map(line => line.trim()).slice(1) : null
        if (code) this.code = code;
    };

    get name() {
        return this.constructor.name;
    }

    toString() {
        const stack = this.stack.reduce((p, c) => { 
            return p.concat("\t" + c + "\n")
        }, "");

        return `${this.name}: ${this.message}
${stack}`
    };
}


exports = module.exports = RuntimeError;