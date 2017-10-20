/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const { Error } = require('../index');
const expect = require('expect.js');

describe("Error", () => {

    it("only message", () => {
        try {
            throw new Error("Test")
        } 
        catch(runtimeError) {
            expect(runtimeError.message).to.be("Test");
            expect(runtimeError.name).to.be("Error");
            console.log(runtimeError.toString())
        }
    });

});
