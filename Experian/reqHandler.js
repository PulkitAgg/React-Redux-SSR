const util = require('../util');
const mysqlDbHandler = require('../mysqlDbHandler');
const mysqlpool = mysqlDbHandler.mysqlpool;
var requestify = require('requestify');


let reqHandler = {
    createrequest: function (event, context, callback) {

        let response = util.getResObj();
        const body = JSON.parse(event["body"]);
      
        const input = [body["customerid"],"",""];

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
                    conn.query("call proc_exp_request(?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in createrequest experian";
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
                            response.body.result = sqlResult[1];
                            response.body.resultinfo = sqlResult[0];
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