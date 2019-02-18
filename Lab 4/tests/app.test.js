/*jshint esversion: 6 */

describe('doPythagoras function', function () {
    //basic test
    it('should return the hypotenuse as 5 where the other two sides are 3 and 4', function () {
        chai.expect(doPythagoras(3, 4)).to.equal(5);
    });
    //Parameterised test with positive numbers
    for (let a = 0; a < 5; a++) {
        for (let b = 0; b < 5; b++) {
            let c = Number((Math.sqrt(a * a + b * b)).toFixed(2));
            it('should return the hypotenuse as ' + c + ' where the other two sides are ' + a + ' and ' + b, function () {
                chai.expect(Number(doPythagoras(a, b).toFixed(2))).to.equal(Number(c.toFixed(2)));
            });
        }
    }
    //Negative numbers
    it('should return "Negative numbers" when a is less than zero', function () {
        chai.expect(doPythagoras(-5, 3)).to.equal("Negative numbers");
    });
    it('should return "Negative numbers" when b is less than zero', function () {
        chai.expect(doPythagoras(5, -3)).to.equal("Negative numbers");
    });
    it('should return "Negative numbers" when a and b are less than zero', function () {
        chai.expect(doPythagoras(-1, -2)).to.equal("Negative numbers");
    });
    // Negative number and NaN
    it('should return "Negative numbers" when a is less than zero, and b is NaN', function () {
        chai.expect(doPythagoras(-4, "wow")).to.equal("Negative numbers");
    });
    // NaNs
    it('should return "Invalid input" if either a or b are NaN and neither is negative', function () {
        chai.expect(doPythagoras("test", 6)).to.equal("Invalid input");
    });
    it('should return "Invalid input" if both a and b are NaN', function () {
        chai.expect(doPythagoras("test", "wow")).to.equal("Invalid input");
    });
});

describe('checkURL function', function () {
    it('should return false if the input is an empty string', function () {
        chai.expect(checkURL("")).to.equal(false);
    });
    it('should return true if the input is a proper URL, like http://google.com', function () {
        chai.expect(checkURL("http://google.com")).to.equal(true);
    });
    let complicatedURL = "http://root@example.com:3036/path/to/file.html?bool=true#seg1";
    it('should return true if the input is a proper URL, like ' + complicatedURL, function () {
        chai.expect(checkURL(complicatedURL)).to.equal(true);
    });
});

describe('markAndResetInput function', function () {
    it('should not throw an exception/error when a null object is passed in', function () {
        chai.expect(function () {
            markAndResetInput(null);
        }).to.not.throw();
    });
    it('should not throw an exception/error when undefined is passed in', function () {
        chai.expect(function () {
            markAndResetInput(undefined);
        }).to.not.throw();
    });
});

describe('loadFileAsync function', function () {
    it('should load a url and call a callback with the requested resource', function (done) {
        loadFileAsync('https://veff213-sudoku.herokuapp.com/test', function (response) {
            chai.expect(response).to.equal("Backend is online.");
            done();
        });
    });
    it('should call the callback with null if requested resource is not found', function (done) {
        loadFileAsync('https://fakeaddress.notreal/', function (response) {
            chai.expect(response).to.be.null;
            done();
        });
    });
    it('should call the callback with null if the url is invalid', function (done) {
        loadFileAsync('https:///', function (response) {
            chai.expect(response).to.be.null;
            done();
        });
    });
    it('should call the callback with null if HTTP request is not successful', function (done) {
        loadFileAsync('https://fakeaddress.notreal/', function (response) {
            chai.expect(response).to.be.null;
            done();
        });
    });
});
