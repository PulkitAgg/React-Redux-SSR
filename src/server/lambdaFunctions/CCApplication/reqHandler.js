const AWS = require('aws-sdk');


let reqHandler = {

    createapplication: function (event, context, callback) {

        try {
            return callback(null, {"response":"susccess"});
        }
        catch (ex) {
            console.log("Error " + ex);
        }

    }

};

module.exports = reqHandler;