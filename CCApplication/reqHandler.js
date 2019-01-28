const AWS = require('aws-sdk');
const util = require('../util');
const mysqlDbHandler = require('../mysqlDbHandler');
const mysqlpool = mysqlDbHandler.mysqlpool;


let reqHandler = {

    createapplication: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
        const input = [body["customerid"], body["bankid"], body["statusid"],body["offerid"], body["income"],
                       body["pincode"],body["latlong"], body["macaddress"], body["browser"],body["os"], 
                       body["source"], body["createdby"],body["createdip"],"",""];

        try {
            mysqlpool.getConnection(function (err, conn) {
                if (err) {
                    let errMsg = "mysqlpool error"
                    console.log(errMsg, err);
                    response.body.status = 0;
                    response.body.error = err;
                    response.body.result = [];
                    response.body = JSON.stringify(response.body);
                    context.callbackWaitsForEmptyEventLoop = false;
                    return callback(null, response);
                } else {
                    conn.query("call proc_cc_createapplication(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_createapplication";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                            response.body.status = sqlResult[1][0]["o_errcode"];
                            response.body.message = sqlResult[1][0]["o_errdesc"];
                            response.body.result = sqlResult[0];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;
                            return callback(null, response);
                        }
                    })

                }
            })

        }
        catch (ex) {
            console.log("Error " + ex);
        }

    },

    updateapplication: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
        const input = [body["applicationid"], body["customerid"], body["statusid"], 
        body["isalreadyapplied"],
        body["bankresponseid"],
        body["bankresponsestatus"],
        body["isscucess"],   
        body["modifiedby"], body["modifiedip"],"",""];

        try {
            mysqlpool.getConnection(function (err, conn) {
                if (err) {
                    let errMsg = "mysqlpool error"
                    console.log(errMsg, err);
                    response.body.status = 0;
                    response.body.error = err;
                    response.body.result = [];
                    response.body = JSON.stringify(response.body);
                    context.callbackWaitsForEmptyEventLoop = false;
                    return callback(null, response);
                } else {
                    conn.query("call proc_cc_updateapplication(?,?,?,?,?,?,?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_updateapplication";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                            response.body.status = sqlResult[1][0]["o_errcode"];
                            response.body.message = sqlResult[1][0]["o_errdesc"];
                            response.body.result = sqlResult[0];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;
                            return callback(null, response);
                        }
                    })

                }
            })

        }
        catch (ex) {
            console.log("Error " + ex);
        }

    }

};

module.exports = reqHandler;