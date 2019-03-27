const express = require('express');
const router = express.Router();

//Sample data for Project 3

//The following is an example of an array of two stations. 
//The observation array includes the ids of the observations belonging to the specified station
var stations = {
    1: { id: 1, description: "Reykjavik", lat: 64.1275, lon: 21.9028, observations: [2] },
    422: { id: 422, description: "Akureyri", lat: 65.6856, lon: 18.1002, observations: [1] }
};
let currentStationID = 422;

//The following is an example of an array of two observations.
//Note that an observation does not know which station it belongs to!
var observations = {
    1: { id: 1, date: 1551885104266, temp: -2.7, windSpeed: 2.0, windDir: "ese", prec: 0.0, hum: 82.0 },
    2: { id: 2, date: 1551885137409, temp: 0.6, windSpeed: 5.0, windDir: "n", prec: 0.0, hum: 50.0 },
};
let currentObservationID = 2;


function checkObservation(body) {
    const requiredArgs = {
        "temp": Number, "windSpeed": Number, "windDir": String,
        "prec": Number, "hum": Number
    };
    let [observation, errors] = validateType(requiredArgs, body);
    if (observation.prec < 0) {
        errors.push("Precipitation cannot be negative");
    }
    if (observation.hum > 100 || observation.hum < 0) {
        errors.push("Humidity should be between 0 and 100");
    }
    return [observation, errors];
}

function checkStation(body) {
    const requiredArgs = { "description": String, "lat": Number, "lon": Number };
    let [station, errors] = validateType(requiredArgs, body);
    if (station.lat !== undefined && (station.lat < -90 || station.lat > 90)) {
        errors.push("Latitude should be between -90 and 90");
    }
    if (station.lon !== undefined && (station.lon < -180 || station.lon > 180)) {
        errors.push("Longitude should be between -180 and 180");
    }
    return [station, errors];
}

function validateType(keysToTypes, body) {
    let errors = [];
    let obj = {};
    for (let key in keysToTypes) {
        let type = keysToTypes[key];
        let value = body[key];
        if (value === undefined) {
            errors.push(key + " is required in the request body");
        } else if (type == Number) {
            if (isNaN(value)) {
                errors.push(key + " should be a number");
            }
            else {
                obj[key] = Number(value);
            }
        } else if (type == String) {
            obj[key] = value.toString();
        }
    }
    return [obj, errors];
}

router.get('/stations', (req, res) => {
    let station_repr = [];
    for (let key in stations) {
        const station = stations[key];
        station_repr.push({
            "description": station.description,
            "id": station.id
        });
    }
    res.status(200).json(station_repr);
});

router.use("/stations/:stationID*", (req, res, next) => {
    //Middleware for getting a station
    let station = stations[Number(req.params.stationID)];
    if (station === undefined) {
        res.status(404).json({ "message": `station with ID ${req.params.stationID} not found.` });
        return;
    }
    req.station = station;
    next();
});

router.get('/stations/:stationID', (req, res) => {
    let station = req.station;
    res.status(200).json(station);
});

router.delete('/stations/:stationID', (req, res) => {
    let station = req.station;
    for (let index in station.observations) {
        let observationID = station.observations[index];
        station.observations[index] = observations[observationID];
        delete observations[observationID];
    }
    delete stations[req.params.stationID];
    res.status(200).json(station);
});

router.post('/stations', (req, res) => {
    let [station, errors] = checkStation(req.body);
    if (errors.length > 0) {
        res.status(400).json({ 'message': errors.join(". ") });
    } else {
        currentStationID++;
        station.id = currentStationID;
        station.observations = [];
        stations[currentStationID] = station;
        res.status(201).json(station);
    }
});

router.put("/stations/:stationID", (req, res) => {
    let station = req.station;
    let [updated_station, errors] = checkStation(req.body);
    if (errors.length > 0) {
        res.status(400).json({ 'message': errors.join(". ") });
    } else {
        for (let key in updated_station) {
            station[key] = updated_station[key];
        }
        res.status(200).json(station);
    }
});

router.delete("/stations", (req, res) => {
    let old_stations = stations;
    for (let stationID in stations) {
        let station = stations[stationID];
        for (let index in station.observations) {
            let observationID = station.observations[index];
            station.observations[index] = observations[observationID];
        }
    }
    stations = {};
    observations = {};
    res.status(200).json(Object.values(old_stations));
});

router.get('/stations/:stationID/observations', (req, res) => {
    let station = req.station;
    let stationObservations = [];
    for (let index in station.observations) {
        stationObservations.push(observations[station.observations[index]]);
    }
    res.status(200).json(Object.values(stationObservations));
});

router.use('/stations/:stationID/observations/:observationID*', (req, res, next) => {
    // Middleware for getting an observation
    let station = req.station;
    let observationID = Number(req.params.observationID);
    if (station.observations.indexOf(observationID) !== -1) {
        let observation = observations[observationID];
        req.observation = observation;
        next();
        return;
    }
    res.status(404).json({
        "message": "observation with ID " + req.params.observationID +
            " not found for station with ID " + req.params.stationID
    });
});

router.get('/stations/:stationID/observations/:observationID', (req, res) => {
    let observation = req.observation;
    res.status(200).json(observation);
});

router.post('/stations/:stationID/observations/', (req, res) => {
    let station = req.station;
    let [observation, errors] = checkObservation(req.body);
    if (errors.length > 0) {
        res.status(400).json({ 'message': errors.join(". ") });
    } else {
        currentObservationID++;
        observation.id = currentObservationID;
        observation.date = Date.now();
        station.observations.push(currentObservationID);
        observations[currentObservationID] = observation;
        res.status(201).json(observation);
    }
});

router.delete('/stations/:stationID/observations/:observationID', (req, res) => {
    let observation = req.observation;
    delete observations[observation.id];
    res.status(200).json(observation);
});

router.delete('/stations/:stationID/observations/', (req, res) => {
    let station = req.station;
    let deleted = [];
    station.observations.forEach(observationID => {
        deleted.push(observations[observationID]);
        delete observations[observationID];
    });
    res.status(200).json(deleted);
});

module.exports = router;
