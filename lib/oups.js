/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const i18n = require("i18n");

class Oups extends Error {
    constructor({ message = "Error", data = {}, error, code }) {
        const tpl = new Function("data", `return \`${message}\`;`) 
        const msg = message = tpl(data);
        super(msg);
        if (!this.stack && Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);  //capture the stack
        //convert stack to array
        this.stack = this.stack ? this.stack.split('\n').map(line => line.trim()).slice(1) : null;
        if (error) this.ancestor = error; //error is an ancestor        
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