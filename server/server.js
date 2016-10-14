var express = require('express')
var https = require('https')
var http = require('http')
var fs = require('fs')

var app = express()
app.use(express.static('../client'))

require('./logging.js')(app)

// Create an HTTP service.
http.createServer(app).listen(8081)
// Create an HTTPS service identical to the HTTP service.
var options = {
  key: fs.readFileSync('certificates/key.pem'),
  cert: fs.readFileSync('certificates/cert.pem')
}
https.createServer(options, app).listen(8082)