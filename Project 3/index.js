const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const apiV1 = require('./api_v1');
const port = 3000;

app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    res.status(400).send('Error when processing JSON');
});

app.use("/api/v1", apiV1);

app.use('*', (req, res) => {
    res.status(405).send('Operation not supported.');
});

app.listen(port, () => {
    console.log('Express app listening on port ' + port);
});