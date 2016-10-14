var winston = require('winston')
var morgan = require('morgan')
var path = require('path')
var fs = require('fs')

module.exports = function (app) {
    var logDirectory = path.join(__dirname, 'logs')

    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
        level:            'info',
        filename:         './all-logs.log',
        handleExceptions: true,
        json:             true,
        maxsize:          5242880, //5MB
        maxFiles:         5,
        colorize:         false
        }), 
        new winston.transports.Console({ 
        level:            'debug', 
        handleExceptions: true, 
        json:             false, 
        colorize:         true 
        }) 
    ], 
    exitOnError: false 
    });
    
    logger.stream = { 
    write: function(message, encoding){ 
        logger.info(message); 
    } 
    }; 
    
    app.use(morgan("combined", { "stream": logger.stream }));
}