/*jshint esversion: 6 */

describe("reverseArray", function () {
    it("should reverse non-empty array", function () {
        var my_array = [1, 2, 3, 4];
        var array_copy = [1, 2, 3, 4];
        reverseArray(my_array);
        chai.expect(my_array[0]).to.equal(array_copy[3]);
        chai.expect(my_array[1]).to.equal(array_copy[2]);
        chai.expect(my_array[2]).to.equal(array_copy[1]);
        chai.expect(my_array[3]).to.equal(array_copy[0]);
    });
    it("should return null when input is a number", function () {
        var my_array = 1;
        chai.expect(reverseArray(my_array)).to.equal(null);
    });
});

describe("seperateString", function () {
    it("should seperate a non-empty string into an array", function () {
        var string = "This is an example of a string";
        chai.expect(seperateString(string)).to.deep.equal(string.split(" "));
    });
});

describe("matrix", function () {
    it("should return true if a diagonal matrix is provided", function () {
        chai.expect(checkDiagonality([[1, 0, 0], [0, 1, 0], [0, 0, 4]])).to.be.true;
    });
    it("should return false if a non-diagonal matrix is provided", function () {
        chai.expect(checkDiagonality([[1, 0, 7], [3, 1, 0], [0, 0, 4]])).to.be.false;
    });
    it("should return false if non-matrix parameter is provided", function () {
        chai.expect(checkDiagonality(undefined)).to.be.false;
    });
    it("should return false if non-matrix parameter is provided", function () {
        chai.expect(checkDiagonality([[1, 2, 3], [1, 2], [1, 2, 3]])).to.be.false;
    });
});

describe("object", function () {
    //circle = {radius: 4, center: {x: 4, y: 0}};
    //point = {x: 4, y: 3};
    it("should return true if the point lies within the circle", function () {
        let circle = { radius: 4, center: { x: 0, y: 0 } };
        let point = { x: 2, y: 1 };
        chai.expect(radiusCalculation(circle, point)).to.equal(true);
    });
    it("should return false if the point lies outside the circle", function () {
        let circle = { radius: 4, center: { x: 0, y: 0 } };
        let point = { x: 2, y: 6 };
        chai.expect(radiusCalculation(circle, point)).to.equal(false);
    });
    it("should return false if the circle is undefined", function () {
        let circle;
        let point = { x: 2, y: 6 };
        chai.expect(radiusCalculation(circle, point)).to.equal(false);
    });
    
});