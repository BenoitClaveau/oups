/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */

"use strict";

const i18n = require("i18n");
const { inspect } = require("util");

class RuntimeError extends Error {

    static getStack(error) {
        let stack = error.stack ? error.stack.replace("\n\n", "\n").split("\n").map(line => line) : [];
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
        const transform = entries.reduce((previous, [k,v]) => {
            if (/^[a-zA-Z0-9\u00C0-\u017F]+$/.test(k)) { //exclude field now word field 
                previous.args.push(k);
                previous.params.push(v instanceof Object ? inspect(v) : v);
            }
            return previous;
        }, { args: ["data"], params: [data]}); //add data as arg & param

        const tpl = new Function(...transform.args, `return \`${message}\`;`)
        const msg = tpl.apply(null, transform.params);
        
        super(msg);
        Error.captureStackTrace(this, this.constructor);  //capture the stack
        if (error) this.ancestor = error; //error is an ancestor

        this.template = message;
        this.stack = RuntimeError.getStack(this).reduce((p, c) => p.concat(c + "\n"), "");
        if (data) this.data = data;
    };

    get name() {
        return this.constructor.name;
    }

    toString() {
        return this.stack
    };
}


exports = module.exports = RuntimeError;