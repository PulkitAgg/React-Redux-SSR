const reqHandler = require('./reqHandler.js');


module.exports.handler  = (event, context, callback) => {
  reqHandler.getoffers(event, context, callback);
};

module.exports.cardfeatureshandler  = (event, context, callback) => {
  reqHandler.getcardfeatures(event, context, callback);
  
};

module.exports.cardviewdetailshandler  = (event, context, callback) => {
  reqHandler.getcardviewdetails(event, context, callback);
  
};

module.exports.getageoffercheckhandler  = (event, context, callback) => {
  reqHandler.getageoffercheck(event, context, callback);
  
};

