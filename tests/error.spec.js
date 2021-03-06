/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const { Error } = require('../index');
const expect = require('expect.js');

describe("Error", () => {

    it("new Error", () => {
        try {
            throw new Error("Hello ${name}!", { name: "Ben" });
        }
        catch(error) {
            expect(error.message).to.be("Hello Ben!");
            expect(error.name).to.be("RuntimeError");
        }
    });

    it("bind complex data", () => {
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
        }
    });

    it("data", () => {
        try {
            throw new Error("Hello ${Name5}!", { Name5: "Paul" })
        } 
        catch(error) {
            expect(error.message).to.be("Hello Paul!");
        }
    });

    it("data with no word field", () => {
        try {
            throw new Error("Hello ${data['Name 5']}!", { "Name 5": "Paul" })
        } 
        catch(error) {
            expect(error.message).to.be("Hello Paul!");
        }
    });
});
