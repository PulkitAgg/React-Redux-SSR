const reqHandler = require('./reqHandler.js');


module.exports.handler  = (event, context, callback) => {
  reqHandler.customerregistration(event, context, callback);
};

module.exports.customerinfohandler  = (event, context, callback) => {
  reqHandler.customerinfo(event, context, callback);
};

module.exports.customerverificationhandler  = (event, context, callback) => {
  reqHandler.customerverification(event, context, callback);
};

module.exports.customerprofilehandler  = (event, context, callback) => {
  reqHandler.createcustomerprofile(event, context, callback);
};

module.exports.mobnoupdatebycustidhandler  = (event, context, callback) => {
  reqHandler.updatemobilenobycustid(event, context, callback);
};

module.exports.otpupdatebycustidhandler  = (event, context, callback) => {
  reqHandler.updateotpbycustid(event, context, callback);
};


