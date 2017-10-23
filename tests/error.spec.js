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
        catch(error) {
            expect(error.message).to.be("Test");
            expect(error.name).to.be("Error");
            console.log(error.toString())
        }
    });

});
