describe("checkRandomNumber", function(){
    it("should return a random boolean", function(){
        chai.expect(check_guess(5)).to.be.a('boolean');
    });
});