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
    it("should return null when input is a number", function(){
        var my_array = 1;
        chai.expect(reverseArray(my_array)).to.equal(null);
    });
});

describe("seperateString", function(){
    it("should seperate a non-empty string into an array", function(){
        var string = "This is an example of a string";
        chai.expect(seperateString(string)).to.deep.equal(string.split(" "));
    });
});