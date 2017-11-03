/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const i18n = require("i18n");

class RuntimeError extends Error {

    static getStack(error) {
        let stack = error.stack ? error.stack.split('\n').map(line => line) : [];
        if (error.ancestor instanceof Error == false) return stack;
        return stack.concat(this.getStack(error.ancestor));
    }

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
        if (error) 
            this.ancestor = error; //error is an ancestor

        this.template = message;
        let stack = RuntimeError.getStack(this).reduce((p, c) => p.concat(c + "\n"), "");
    };

    get name() {
        return this.constructor.name;
    }

    toString() {
        return this.stack
    };

    

}


exports = module.exports = RuntimeError;