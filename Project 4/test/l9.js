// let chai = require('chai');
// let chaiHttp = require('chai-http');
// chai.use(chaiHttp);

// require('../app');

// describe("User endpoints", function() {
//     it("POST /users success case", function (done) {
//         let newUser = {username: "grischa", age:213};

//         chai.request("http://localhost:3000")
//         .post('/users')
//         .set('content-type','application/json')
//         .send(newUser)
//         .end((err,res) => {
//             chai.expect(res).to.have.status(201);
//             chai.expect(res).to.be.json;
//             chai.expect(res.body).is.a('object');
//             chai.expect(res.body.username).to.be.equal("grischa");
//             chai.expect(res.body).to.have.property('age').equal(213);
//             chai.expect(res.body).to.have.property('id');
//             done();
//         });
//     });

//     it("POST /users failure case: age missing", function (done) {
//         let newUser = {username: "grischa"};

//         chai.request("http://localhost:3000")
//         .post('/users')
//         .set('content-type','application/json')
//         .send(newUser)
//         .end((err,res) => {
//             chai.expect(res).to.have.status(400);
//             done();
//         });
//     });

//     it("GET /users success case", function (done) {
//         chai.request("http://localhost:3000")
//         .get('/users')
//         .end((err,res) => {
//             chai.expect(res).to.have.status(200);
//             chai.expect(res).to.be.json;
//             chai.expect(res.body).is.a('array');
//             //There are three users AFTER the successful POST test case ran
//             //This is an interaction between tests, and usually something you want to avoid
//             chai.expect(res.body.length).to.be.equal(3);
//             chai.expect(res.body[0]).to.have.property('username').eql("Alice");
//             chai.expect(res.body[0]).to.have.property('age').eql(25);
//             chai.expect(res.body[0]).to.have.property('id').eql(5);
//             chai.expect(Object.keys(res.body[0]).length).to.be.equal(3);
//             chai.expect(res.body[0].username).to.be.a('string');
//             chai.expect(res.body[0].age).to.be.a('number');
//             chai.expect(res.body[0].id).to.be.a('number');
//             done();
//         });
//     });
// });
