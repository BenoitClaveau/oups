/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const { HttpError } = require('../index');
const expect = require('expect.js');

describe("Error", () => {

    it("message", () => {
        try {
            throw new HttpError(500, "Test")
        } 
        catch(error) {
            expect(error.statusCode).to.be(500);
            expect(error.message).to.be("Test");
            expect(error.name).to.be("HttpError");
            console.log(error.toString())
        }
    });

});
