/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const { UndefinedError } = require('../index');
const expect = require('expect.js');

describe("Undefined", () => {

    it("new Error", () => {
        try {
            throw new UndefinedError("name", { name: "Ben" });
        }
        catch(error) {
            expect(error.message).to.be("name is undefined.");
            expect(error.name).to.be("UndefinedError");
        }
    });
});
