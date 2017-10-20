/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const i18n = require("i18n");

class Oups extends Error {
    constructor({ message, data, error, code }) {
        super();
        if (message) { //bind data to message
            const tpl = new Function("data", `return \`${message}\`;`) 
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
        if (!this.stack && Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);  //capture the stack
        this.stack = this.stack ? this.stack.split('\n').map(line => line.trim()).slice(1) : null;
        this.code = code || message;
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


exports = module.exports = Oups;