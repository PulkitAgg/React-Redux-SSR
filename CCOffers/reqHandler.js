const AWS = require('aws-sdk');
const util = require('../util');
const mysqlDbHandler = require('../mysqlDbHandler');
const mysqlpool = mysqlDbHandler.mysqlpool;


let reqHandler = {

    getoffers: function (event, context, callback) {

        let response = util.getOfferResObj();
        const body = JSON.parse(event["body"]);


        const input = [body["customerid"], body["pincode"], body["income"], "", ""];

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
                    conn.query("call proc_cc_getoffers(?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_registration";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.offerlist = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success " + JSON.stringify(sqlResult));


                            response.body.offerlist = sqlResult[0];
                            response.body.banklist = sqlResult[1];
                            response.body.keyfeatures = sqlResult[2];
                            response.body.networklist = sqlResult[3];
                            response.body.feelist = sqlResult[4];

                            response.body.status = sqlResult[5][0]["o_errcode"];
                            response.body.message = sqlResult[5][0]["o_errdesc"];

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


    getcardfeatures: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);


        const input = [body["offerlist"], "", ""];

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
                    conn.query("call proc_cc_get_cardfeatures(?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_get_cardfeatures";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                            response.body.status = sqlResult[2][0]["o_errcode"];
                            response.body.message = sqlResult[2][0]["o_errdesc"];
                            response.body.result = sqlResult[0];
                            response.body.resultinfo = sqlResult[1];
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

    getcardviewdetails: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);


        const input = [body["offerid"], "", ""];

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
                    conn.query("call proc_cc_getofferviewdetails(?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_getofferviewdetails";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                            response.body.status = sqlResult[2][0]["o_errcode"];
                            response.body.message = sqlResult[2][0]["o_errdesc"];
                            response.body.result = sqlResult[0];
                            response.body.resultinfo = sqlResult[1];
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


    getageoffercheck: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);

        console.log("Call getageoffercheck");
        const input = [body["age"], body["parentofferid"], body["emptype"], "", ""];
        console.log("Call getageoffercheck " + input);

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
                    conn.query("call proc_cc_offeragecheck(?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_offeragecheck";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                            response.body.status = sqlResult[0][0]["o_errcode"];
                            response.body.message = sqlResult[0][0]["o_errdesc"];
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

};





module.exports = reqHandler;