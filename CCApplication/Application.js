const reqHandler = require('./reqHandler.js');


module.exports.handler  = (event, context, callback) => {
  reqHandler.createapplication(event, context, callback);
};

module.exports.updateapplicationhandler  = (event, context, callback) => {
    reqHandler.updateapplication(event, context, callback);
  };
  
