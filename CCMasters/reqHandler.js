const AWS = require('aws-sdk');
const util = require('../util');
const mysqlDbHandler = require('../mysqlDbHandler');
const mysqlpool = mysqlDbHandler.mysqlpool;

let reqHandler = {

    getcommonmaster: function (event, context, callback) {
        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
        const input = [body["mastertype"], "", ""];
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
                    conn.query("call proc_cc_getcommonmaster(?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_getcommonmaster";
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


    getcompanymaster: function (event, context, callback) {
        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
        const input = ["", ""];
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
                    conn.query("call proc_cc_getcompany(?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_getcompany";
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
   
    getpincode: function (event, context, callback) {
        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
        const input = [body["cityid"],"", ""];
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
                    conn.query("call proc_cm_getpincode(?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cm_getpincode";
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
    getcitybypincode: function (event, context, callback) {
        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
        const input = [body["pincode"],"", ""];
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
                    conn.query("call proc_cm_getcitybypincode(?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.end(conn);
                       
                       
                        if (err) {
                            let errMsg = "conn.query error in proc_cm_getcitybypincode";
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
    getcity: function (event, context, callback) {
        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
        const input = [body["state"],"", ""];
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
                    conn.query("call proc_cm_getcity(?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.end(conn);
                       
                       
                        if (err) {
                            let errMsg = "conn.query error in proc_cm_getcity";
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
    getstate: function (event, context, callback) {
        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
        const input = ["", ""];
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
                    conn.query("call proc_cm_getstate(?,?)", input, function (err, sqlResult) {
                        mysqlpool.end(conn);
                       
                       
                        if (err) {
                            let errMsg = "conn.query error in proc_cm_getstate";
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

    getbank: function (event, context, callback) {
        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
        const input = ["", ""];
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
                    conn.query("call proc_cc_getallbank(?,?)", input, function (err, sqlResult) {
                        mysqlpool.end(conn);
                       
                       
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_getallbank";
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