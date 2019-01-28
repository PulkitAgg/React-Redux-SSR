const reqHandler = require('./reqHandler.js');


module.exports.getcommonmasterhandler  = (event, context, callback) => {
  reqHandler.getcommonmaster(event, context, callback);
};

module.exports.getcompanymasterhandler  = (event, context, callback) => {
  reqHandler.getcompanymaster(event, context, callback);
};


module.exports.getpincodehandler  = (event, context, callback) => {
  reqHandler.getpincode(event, context, callback);
};
module.exports.getcitybypincoecodehandler  = (event, context, callback) => {
  reqHandler.getcitybypincode(event, context, callback);
};
module.exports.getcityhandler  = (event, context, callback) => {
  reqHandler.getcity(event, context, callback);
};

module.exports.getstatehandler  = (event, context, callback) => {
  reqHandler.getstate(event, context, callback);
};

module.exports.getbankhandler  = (event, context, callback) => {
  reqHandler.getbank(event, context, callback);
};