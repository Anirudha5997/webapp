const winston = require('winston');
const {combine, timestamp, json, errors } = winston.format

winston.loggers.add('webappLogger',{
    level: 'debug',
    format: combine(
        timestamp(),
        json(),
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: `webapp.log` }),
    ]
});

