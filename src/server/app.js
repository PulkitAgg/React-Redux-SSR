/**
 * Created by Suraj on 23/01/19.
 */

import express from 'express'
import morgan from 'morgan'
import bodyParser   from 'body-parser';
import http from 'http'
import routes from './app/routes/routes';
import apiRpoutes from './app/routes/apiRoutes';
import procedure from "./procedure"; // for running the script

var app = express();
// import reactroutes from "./routes/reactRoutes";


import winston from 'winston';
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    })
  ]
});
// logger.level = 'debug';
// logger.info('Hello world');
// logger.debug('Debugging info');

// app.use(morgan(_config.env));
app.use(morgan('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static("public"));
//MongoDB Database connection
// rootRequire('app/db/connect/mongoDbConn');

//enabling cors
var cors = function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "accept, content-type, x-access-token, x-requested-with");
	next();
};
  
app.use(cors);
app.disable('etag');
//health check endpoint for aws health check
// app.get('/', require('express-healthcheck')());
app.use('/api',apiRpoutes)
app.use("/", routes);
// app.get("*", (req,res) => {
// 	res.json({a:1})
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	console.log("err",err)
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err.message);
});


export default app;

// module.exports = app;
