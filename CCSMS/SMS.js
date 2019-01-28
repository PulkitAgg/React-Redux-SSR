const reqHandler = require('./reqHandler.js');


module.exports.handler  = (event, context, callback) => {
  reqHandler.sendSMS(event, context, callback);
};

