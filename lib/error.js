/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const i18n = require("i18n");

class RuntimeError extends Error {
    constructor() {
        let message, data = {}, error;

        let argv = Array.from(arguments);
        let index = argv.findIndex(e => e instanceof Error);
        index >= 0 && (error = argv.splice(index, 1).shift());

        index = argv.findIndex(e => e instanceof Object);
        index >= 0 && (data = argv.splice(index, 1).shift());

        message = argv.shift() || "Error.";
        
        const entries = Object.entries(data);
        const args = entries.map(([k,v]) => k).concat(`return \`${message}\`;`);  //create arguments and function
        const tpl = new Function(...args)
        const params = entries.map(([k,v]) => v);                              //apply values
        const msg = message = tpl.apply(null, params);
        
        super(msg);

        if (!this.stack && Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);  //capture the stack
        this.stack = this.stack ? this.stack.split('\n').map(line => line.trim()).slice(1) : null;
        if (error) 
            this.ancestor = error; //error is an ancestor        
        this.template = message;
    };

    get name() {
        return this.constructor.name;
    }

    toString() {
        return `${this.name}: ${this.message}
${this.stackToString()}`
    };

    stackToString() {
        let stack = this.stack.reduce((p, c) => p.concat("\t" + c + "\n"), "");
        if (this.ancestor && this.ancestor.stack) {
            stack += "ancestor:\n";
            if (this.ancestor.stack instanceof Array) stack += this.ancestor.stack.reduce((p, c) => p.concat("\t" + c + "\n"), "");
            else stack += this.ancestor.stack;
        }
        return stack;
    }

}


exports = module.exports = RuntimeError;