const moment = require('moment')


const requestLogger = (req, res, next) => {
	console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} FROM ${req.ip} AT ${moment().format()}`)
	next();
}


module.exports = requestLogger;