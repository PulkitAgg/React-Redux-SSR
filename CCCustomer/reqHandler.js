const AWS = require('aws-sdk');
const util = require('../util');
const mysqlDbHandler = require('../mysqlDbHandler');
const mysqlpool = mysqlDbHandler.mysqlpool;


let reqHandler = {

    customerregistration: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
      
       
        // const input = [body["name"], body["emailid"], body["mobileno"], body["pincode"], body["income"], body["otp"], 
        // body["emptype"], body["companyid"], body["companyname"], body["employeecategory"], body["latlong"],
        //  body["macaddress"], body["browser"], body["os"], body["source"], body["createdby"], 
        //  body["createdip"], "", ""];
       
   
        const input = [body["name"], body["emailid"], body["mobileno"], body["pincode"], body["income"]
        , body["otp"],
          body["emptype"],
          body["latlong"],
         body["macaddress"], body["browser"], body["os"], body["source"], body["createdby"], 
          body["createdip"]
          , "", ""];

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
                    conn.query("call proc_cc_registration(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_registration";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                           
                            // console.log("sqlresult " +JSON.stringify(sqlResult));
                            // console.log("o_errdesc " + sqlResult[0][0]["o_errdesc"])
                            // console.log("customerid " + sqlResult[0][0]["customerid"])
                            if(sqlResult[0][0]["customerid"] != undefined)
                            {
                                response.body.status = sqlResult[1][0]["o_errcode"];
                                response.body.message = sqlResult[1][0]["o_errdesc"];
                                response.body.result = sqlResult[0];
                                response.body = JSON.stringify(response.body);
                                context.callbackWaitsForEmptyEventLoop = false;
                                return callback(null, response);
                            }
                            else
                            {
                                response.body.status = sqlResult[0][0]["o_errcode"];
                                response.body.message = sqlResult[0][0]["o_errdesc"];
                                response.body.result = sqlResult[0];
                                response.body = JSON.stringify(response.body);
                                context.callbackWaitsForEmptyEventLoop = false;
                                return callback(null, response);

                            }
                        }
                    })

                }
            })

        }
        catch (ex) {
            console.log("Error " + ex);
        }

    },

    customerinfo: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
       

        const input = [body["customerid"], body["mobileno"],"",""];

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
                    conn.query("call proc_cc_getcustomerdetails(?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_getcustomerdetails";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                            
                            if(sqlResult[0][0]["customerid"] != undefined)
                            {
                                response.body.status = sqlResult[1][0]["o_errcode"];
                                response.body.message = sqlResult[1][0]["o_errdesc"];
                                response.body.result = sqlResult[0];
                                response.body = JSON.stringify(response.body);
                                context.callbackWaitsForEmptyEventLoop = false;
                                return callback(null, response);
                            }
                            else
                            {
                                response.body.status = sqlResult[0][0]["o_errcode"];
                                response.body.message = sqlResult[0][0]["o_errdesc"];
                                response.body.result = sqlResult[0];
                                response.body = JSON.stringify(response.body);
                                context.callbackWaitsForEmptyEventLoop = false;
                                return callback(null, response);

                            }
                            
                        }
                    })

                }
            })

        }
        catch (ex) {
            console.log("Error " + ex);
        }

    },

    customerverification: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
       

        const input = [body["customerid"], body["name"],body["emailid"],body["mobileno"],body["pincode"], body["income"],body["otp"],body["emptype"],body["latlong"],
                       body["macaddress"], body["browser"],body["os"],body["source"],body["createdby"], body["createdip"],"",""];

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
                    conn.query("call proc_cc_verification(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_verification";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                            //console.log("sqlresult " +JSON.stringify(sqlResult));
                            // console.log("o_errdesc " + sqlResult[0][0]["o_errdesc"])
                            // console.log("customerid " + sqlResult[0][0]["customerid"])
                           if(sqlResult[0][0]["customerid"] != undefined)
                            {
                                response.body.status = sqlResult[1][0]["o_errcode"];
                                response.body.message = sqlResult[1][0]["o_errdesc"];
                                response.body.result = sqlResult[0];
                                response.body = JSON.stringify(response.body);
                                context.callbackWaitsForEmptyEventLoop = false;
                                return callback(null, response);
                            }
                            else
                            {
                                response.body.status = sqlResult[0][0]["o_errcode"];
                                response.body.message = sqlResult[0][0]["o_errdesc"];
                                response.body.result = sqlResult[0];
                                response.body = JSON.stringify(response.body);
                                context.callbackWaitsForEmptyEventLoop = false;
                                return callback(null, response);

                            }
                        }
                    })

                }
            })

        }
        catch (ex) {
            console.log("Error " + ex);
        }

    },

    
    createcustomerprofile: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
                const input = [body["name"],body["emailid"],body["mobileno"],body["pancard"],body["DOB"],body["prefix"],body["gender"],body["customerid"],body["companyname"],body["compnayid"],
                              body["qualificationid"], body["residenceaddress1"],body["residenceaddress2"],body["residenceaddress3"],body["resicity"], body["resipin"],body["resiphone"],body["resistate"],body["resistdcode"],body["occupationtype"],
                              body["designation"], body["natureofbusiness"],body["officeaddress1"],body["officeaddress2"],body["officeaddress3"], body["officephone"],body["officestdcode"],body["officepin"],body["officestate"],body["officecity"],
                              body["yearsofcurrentemployment"], body["fathersname"],body["mothersmaidenname"],body["resilandmark"],body["officelandmark"], body["createdby"],body["createdip"],
                              body["adhaarcard"],body["applicationid"],
                              body["existingcreditcardlist"],body["isexistingloan"],
                              body["latlong"],body["macaddress"],body["browser"],
                              body["os"], body["source"],"",""];

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
                    conn.query("call proc_cc_createcustomerprofile(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_createcustomerprofile";
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
    updatemobilenobycustid: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
        const input = [body["customerid"],body["mobileno"],"",""];

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
                    conn.query("call proc_cc_updatemobilenobycustid(?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_updatemobilenobycustid";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                           
                            if(sqlResult[0][0]["customerid"] != undefined)
                            {
                                response.body.status = sqlResult[1][0]["o_errcode"];
                                response.body.message = sqlResult[1][0]["o_errdesc"];
                                response.body.result = sqlResult[0];
                                response.body = JSON.stringify(response.body);
                                context.callbackWaitsForEmptyEventLoop = false;
                                return callback(null, response);
                            }
                            else
                            {
                                response.body.status = sqlResult[0][0]["o_errcode"];
                                response.body.message = sqlResult[0][0]["o_errdesc"];
                                response.body.result = sqlResult[0];
                                response.body = JSON.stringify(response.body);
                                context.callbackWaitsForEmptyEventLoop = false;
                                return callback(null, response);

                            }
                        }
                    })

                }
            })

        }
        catch (ex) {
            console.log("Error " + ex);
        }

    },

    updateotpbycustid: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
        const input = [body["customerid"],body["otp"],"","",""];

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
                    conn.query("call proc_cc_updateotpbycustid(?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cc_updateotpbycustid";
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

    }


};

module.exports = reqHandler;