/*!
 * qwebs
 * Copyright(c) 2017 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */
"use strict";

const { RuntimeError } = require('../index');
const expect = require('expect.js');

describe("runtime", () => {

    // it("RuntimeError", () => {
    //     try {
    //         throw new RuntimeError({ template: "Hello ${data.name}!", data: { name: "Ben"} });
    //     } 
    //     catch(error) {
    //         expect(error.message).to.be("Hello Ben!");
    //         expect(error.name).to.be("RuntimeError");
    //     }
    // });

    // it("toString", () => {
    //     try {
    //         throw new RuntimeError({ template: "Hello ${data.user.name}!", data: { user: { name: "Paul" }}});
    //     } 
    //     catch(error) {
    //         console.log(error.toString())
    //     }
    // });

    it("toString", () => {
        try {
            try {
                throw new Error("Test")
            } 
            catch(error) {
                throw new RuntimeError({error}); //forward error
            }
        }
        catch(runtimeError) {
            expect(runtimeError.message).to.be("Test");
            expect(runtimeError.name).to.be("RuntimeError");
            console.log(runtimeError.toString())
        }
    });

});
