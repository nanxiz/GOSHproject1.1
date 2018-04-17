const http = require('http');
const app = require('./app');
const port = process.env.PORT || 10255;

const server = http.createServer(app); //funtion called first


server.listen(port, '127.0.0.1');