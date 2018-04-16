const bodyParser = require('body-parser');
const logger = require('./logger');
const { serverConfig } = require('./config').appConfig;
const api  = require('./api');
let db = require('./database');


// Event listener for HTTP server "onError" event.

function onError(error) {
	if(error.syscall !=='listen') {
		throw error;
	}
	let bind = 'Port ' + serverConfig.port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      break;
    default:
      throw error;
  }
}

/* setting middleware with some basic module*/
function setAppMiddleware(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended : false}));
}


/* create database connection */
function connectToDatabase() {
  db.createMongoConnection();
  dbConnection = db.getMongoConnection();
  dbConnection.on('error',db.onError);
  dbConnection.once('open',db.onSuccess);
}


// Event listener for HTTP server "listening" event.
function onListening() {
	logger.info('Server running at port 3000');
}

// api Configuration
function apiSetUp(app) {
	app.use('/api', api);
}


module.exports = {
	onError,
  connectToDatabase,
	onListening,
  apiSetUp,
  setAppMiddleware
}