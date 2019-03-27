const chai = require("chai");
const sinon = require("sinon");
const math = require("../math");

describe("doDivision function", () =>{
    it("Should return 0.75 as result of 3 / 4 (to 2 digits after the comma)", () =>{
        chai.expect(Number(math.doDivision(3, 4).toFixed(2))).to.equal(0.75);
    });
    
    // You can't divide a number with an array (failure case), so whatever the output is,
    // it shouldn't be a number.
    it("Should return NaN when dividing 5 by [1, 2]", () => {
        chai.expect(math.doDivision(5, [1, 2])).to.be.NaN;
    });

    // Dividing by zero normally yields infinity, it's sign determined by the numerator's.
    // However when both the numerator and denominator are 0 (corner case), 
    // the function should return a NaN. (defined in IEEE 754).
    // Of course, you could also interpret this as a failure case, depending on the use case. 
    it("Should return NaN when dividing 0 by 0", () => {
        chai.expect(math.doDivision(0, 0)).to.be.NaN;
    });
});


describe("stringifyDivision funcion", () => {
    beforeEach(() => {
        let fakeDivision = sinon.fake.returns(2);
        sinon.replace(math, "doDivision", fakeDivision);
    })
    it("Should return the string '8 divided by 4 is 2', when called with 8 and 4'", () => {
        chai.expect(math.stringifyDivision(8, 4)).to.eql("8 divided by 4 is 2");
    });
});