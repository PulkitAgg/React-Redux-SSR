const reqHandler = require('./reqHandler.js');


module.exports.handler  = (event, context, callback) => {
  reqHandler.createrequest(event, context, callback);
};

