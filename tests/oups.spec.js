/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const { Oups } = require('../index');
const expect = require('expect.js');

describe("runtime", () => {

    it("Oups", () => {
        try {
            throw new Oups({ message: "Hello ${data.name}!", data: { name: "Ben"} });
        } 
        catch(error) {
            expect(error.message).to.be("Hello Ben!");
            expect(error.name).to.be("Oups");
        }
    });

    it("toString", () => {
        try {
            throw new Oups({ message: "Hello ${data.user.name}!", data: { user: { name: "Paul" }}});
        } 
        catch(error) {
            console.log(error.toString())
        }
    });

    it("toString", () => {
        try {
            try {
                throw new Error("Test")
            } 
            catch(error) {
                throw new Oups({error}); //forward error
            }
        }
        catch(Oups) {
            expect(Oups.message).to.be("Test");
            expect(Oups.name).to.be("Oups");
            console.log(Oups.toString())
        }
    });

});
