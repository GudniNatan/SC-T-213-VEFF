const http = require('http');
const url = require('url');
const math = require('./math.js');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var parsedURL = url.parse(req.url, true);
    if (req.method === "GET" && parsedURL.pathname === "/divide") {
        var q = parsedURL.query;
        if (q.a !== undefined && q.b !== undefined) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(math.stringifyDivision(q.a, q.b));
            return;
        }
    }
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end("This operation is not supported.");
});

server.listen(port, hostname, () => {
    console.log('Server running at http://' + hostname + ':' + port);
});
