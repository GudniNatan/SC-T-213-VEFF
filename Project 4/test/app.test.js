//These four imports are required for setup
let mongoose = require("mongoose");
let Station = require('../models/station');
let Observation = require('../models/observation');
let server = require('../app');

//These are the actual modules we use
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Endpoint tests', () => {
    //###########################
    //These variables contain the ids of the existing station/observation
    //That way, you can use them in your tests (e.g., to get all observations for a station)
    //###########################
    let stationId = '';
    let observationId = '';

    //###########################
    //The beforeEach function makes sure that before each test, 
    //there is exactly one station and one observation (for the existing station).
    //The ids of both are stored in stationId and observationId
    //###########################
    beforeEach((done) => {
        let station = new Station({ description: "Reykjavik", lat: 64.1275, lon: 21.9028 });
        let observation = new Observation({ stationId: station._id, temp: 2.0, windSpeed: 30.5, windDir: "ne", hum: 20.5, prec: 0.0 });

        Station.deleteMany({}, (err) => {
            Observation.deleteMany({}, (err) => {
                station.save((err, stat) => {
                    observation.save((err, obs) => {
                        stationId = stat._id;
                        observationId = obs._id;
                        done();
                    });
                });
            });
        });
    });

    //###########################
    //Write your tests below here
    //###########################

    it("should always pass", function () {
        chai.expect(1).to.equal(1);
    });

    // REGULAR TESTS
    // Basic success case tests
    it("GET /api/v1/stations success case", function (done) {
        // Endpoint 1
        chai.request("http://localhost:3000")
            .get("/api/v1/stations").end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.a('array');
                chai.expect(res.body.length).to.be.equal(1);
                chai.expect(res.body[0]).to.be.a('object');
                chai.expect(res.body[0]).to.have.property('_id').a('string');
                chai.expect(res.body[0]).to.have.property('description').eql("Reykjavik");
                chai.expect(Object.keys(res.body[0]).length).to.be.equal(2);
                done();
            });
    });

    it("GET /api/v1/stations/:id success case", function (done) {
        // Endpoint 2
        chai.request("http://localhost:3000")
            .get(`/api/v1/stations/${stationId}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.a('object');
                chai.expect(res.body).to.have.property('_id').eql(stationId.toString());
                chai.expect(res.body).to.have.property('description').eql("Reykjavik");
                chai.expect(res.body).to.have.property('lat').eql(64.1275);
                chai.expect(res.body).to.have.property('lon').eql(21.9028);
                chai.expect(res.body).to.have.property('observations').a("array");
                chai.expect(Object.keys(res.body).length).to.be.equal(5);
                chai.expect(res.body.observations).to.deep.equal([observationId.toString()]);
                done();
            });
    });

    it("POST /api/v1/stations success case", function (done) {
        // Endpoint 3
        let station = { "description": "Hafnarfjordur", "lat": 65.275, "lon": 22.5026 };
        chai.request("http://localhost:3000")
            .post('/api/v1/stations/')
            .set('content-type', 'application/json')
            .send(station)
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.a('object');
                chai.expect(res.body).to.have.property('_id').a('string');
                chai.expect(res.body).to.have.property('description').eql("Hafnarfjordur");
                chai.expect(res.body).to.have.property('lat').eql(65.275);
                chai.expect(res.body).to.have.property('lon').eql(22.5026);
                chai.expect(res.body).to.have.property('observations').a("array");
                chai.expect(Object.keys(res.body).length).to.be.equal(5);
                chai.expect(res.body.observations.length).to.equal(0); // no observations
                done();
            });
    });

    it("GET /api/v1/stations/:stationId/observations success case", function (done) {
        // Endpoint 4
        chai.request("http://localhost:3000")
            .get(`/api/v1/stations/${stationId}/observations`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.an('array');
                chai.expect(res.body.length).to.be.equal(1);
                chai.expect(res.body[0]).to.be.a('object');
                chai.expect(res.body[0]).to.have.property('_id').eql(observationId.toString());
                chai.expect(res.body[0]).to.have.property('temp').eql(2.0);
                chai.expect(res.body[0]).to.have.property('windSpeed').eql(30.5);
                chai.expect(res.body[0]).to.have.property('windDir').eql("ne");
                chai.expect(res.body[0]).to.have.property('hum').eql(20.5);
                chai.expect(res.body[0]).to.have.property('prec').eql(0.0);
                chai.expect(Object.keys(res.body[0]).length).to.be.equal(6);
                done();
            });
    });

    it("GET /api/v1/stations/:stationId/observations/:obsId success case", function (done) {
        // Endpoint 5
        chai.request("http://localhost:3000")
            .get(`/api/v1/stations/${stationId}/observations/${observationId}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.a('object');
                chai.expect(res.body).to.have.property('_id').eql(observationId.toString());
                chai.expect(res.body).to.have.property('temp').eql(2.0);
                chai.expect(res.body).to.have.property('windSpeed').eql(30.5);
                chai.expect(res.body).to.have.property('windDir').eql("ne");
                chai.expect(res.body).to.have.property('hum').eql(20.5);
                chai.expect(res.body).to.have.property('prec').eql(0.0);
                chai.expect(Object.keys(res.body).length).to.be.equal(6);
                done();
            });
    });

    it("POST /api/v1/stations/:stationId/observations success case", function (done) {
        // Endpoint 6
        let observation = { "temp": 5.5, "windSpeed": 12.5, "windDir": "sw", "hum": 66.5, "prec": 3.0 };
        chai.request("http://localhost:3000")
            .post(`/api/v1/stations/${stationId}/observations`)
            .set('content-type', 'application/json')
            .send(observation)
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.a('object');
                chai.expect(res.body).to.have.property('_id').a('string');
                chai.expect(res.body).to.have.property('temp').eql(5.5);
                chai.expect(res.body).to.have.property('windSpeed').eql(12.5);
                chai.expect(res.body).to.have.property('windDir').eql("sw");
                chai.expect(res.body).to.have.property('hum').eql(66.5);
                chai.expect(res.body).to.have.property('prec').eql(3.0);
                chai.expect(Object.keys(res.body).length).to.equal(6);
                done();
            });
    });

    it("DELETE /api/v1/stations/:stationId/observations/:obsId success case", function (done) {
        // Endpoint 7
        chai.request("http://localhost:3000")
            .delete(`/api/v1/stations/${stationId}/observations/${observationId}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.a('object');
                chai.expect(res.body).to.deep.equal({
                    "_id": observationId.toString(), "temp": 2.0, "windSpeed": 30.5,
                    "windDir": "ne", "hum": 20.5, "prec": 0.0
                });
                done();
            });
    });
    // Failure case tests
    it('POST /api/v1/stations/:stationId/observations should fail when missing an argument in the body', (done) => {
        let observation = { "temp": 5.5, "windSpeed": 12.5, "hum": 66.5, "prec": 3.0 }; //missing windDir
        chai.request("http://localhost:3000")
            .post(`/api/v1/stations/${stationId}/observations`)
            .set('content-type', 'application/json')
            .send(observation)
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.a('object');
                chai.expect(res.body).to.deep.equal({"message": "Bad request."});
                done();
            });
    });

    it('POST /api/v1/stations/:stationId/observations should fail when humudidity over 100', (done) => {
        let observation = { "temp": 5.5, "windSpeed": 12.5, "windDir": "sw", "hum": 205.3, "prec": 3.0 };
        chai.request("http://localhost:3000")
            .post(`/api/v1/stations/${stationId}/observations`)
            .set('content-type', 'application/json')
            .send(observation)
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res).to.be.json;
                chai.expect(res.body).is.a('object');
                chai.expect(res.body).to.deep.equal({"message": "Bad request."});
                done();
            });
    });
    
    it("/api/v1/stations with unsupported verb (PATCH) failure case", function (done) {
        console.log(stationId);
        chai.request("http://localhost:3000")
            .patch("/api/v1/stations").end((err, res) => {
                chai.expect(res).to.have.status(405);
                done();
            });
    });



    // ADVANCED TESTS
    it("should return all stations that dont have description 'Reykjavik'", (done) => {
        chai.request("http://localhost:3000")
            .get("/api/v1/stations?description[$ne]=Reykjavik").end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.deep.equal([]);
                done();
            });
    });


    it("DELETE /api/v1/stations/:stationId success case", function (done) {
        var sha256 = require('js-sha256');
        let hashString = `DELETE /api/v1/stations/${stationId}`;
        let hashed = sha256.hmac("mysecret", hashString);
        chai.request("http://localhost:3000")
            .delete(`/api/v1/stations/${stationId}`)
            .set("authorization", hashed)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    });

});