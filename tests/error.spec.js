/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const { Error } = require('../index');
const expect = require('expect.js');

describe("bind data", () => {

    it("new Error", () => {
        try {
            throw new Error("Hello ${name}!", { name: "Ben" });
        }
        catch(error) {
            expect(error.message).to.be("Hello Ben!");
            expect(error.name).to.be("RuntimeError");
        }
    });

    it("bind comples data", () => {
        try {
            throw new Error("Hello ${user.name}!", { user: { name: "Paul" }});
        }
        catch(error) {
            expect(error.message).to.be("Hello Paul!");
            expect(error.name).to.be("RuntimeError");
        }
    });

    it("optional data", () => {
        try {
            try {
                throw new Error("Test")
            } 
            catch(error) {
                throw new Error("Override error", error);
            }
        }
        catch(error) {
            expect(error.message).to.be("Override error");
            expect(error.name).to.be("RuntimeError");
            expect(error.ancestor.message).to.be("Test");
            console.log(error.toString())
        }
    });
});
