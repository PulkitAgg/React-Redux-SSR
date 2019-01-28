const util = require('../util');
const mysqlDbHandler = require('../mysqlDbHandler');
const mysqlpool = mysqlDbHandler.mysqlpool;
var requestify = require('requestify');


let reqHandler = {

    sendSMS: function (event, context, callback) {

        let objresponse = util.getResObj();
        const body = JSON.parse(event["body"]);
        body.guid ="";
        body.response="";
        body.responsecode="";
        body.smsid=0;
        
        insertupdatesmsdet(body,context,function(err,rows){
       
       //console.log("resp insertsendSMS " + JSON.stringify(rows));
       var bodyjson = JSON.parse(JSON.stringify(rows.body)); 
       var resuljson = JSON.parse(bodyjson);
       var result1 =JSON.parse(JSON.stringify(resuljson.result)); 

    //    console.log("bodyjson " + bodyjson);
    //    console.log("resuljson "+ resuljson);
    //    console.log("resuljson1 "+JSON.stringify(result1));
    //    console.log("resuljson result1 "+result1[0]["o_errcode"]);
    //    console.log("resuljson result2 "+result1[0].o_errcode);
       body.smsid= result1[0].smsid;
       
       if(result1[0].o_errcode === 200)
       {
        try {
            
            var smsurl ='http://myvaluefirst.com/smpp/sendsms?username=bajajcapital1&password=bajaj123&to='+body["mobileno"]+'&from=BAJAJA&udh=0&text='+body["message"]+'&dlr-mask=19&dlr-url&category=bulk';
            console.log("smsurl " + smsurl);
            requestify.request(smsurl, {
                method: 'GET'
                        
            })
            .then(function(response) {
                    response.getBody();
                    response.getHeaders();
                    response.getHeader('Accept');
                    response.getCode();
                    console.log('resp inner : ' + response.body);
                    var resp = response.body;
                    var Code = resp.split("&")[1].split("=")[1];
                    var guid = resp.split("&")[0].split("=")[1]
                    console.log('resp code : ' + Code);
                    console.log('resp guid : ' + guid);
                    
                    console.log("success case 0");
                    body.guid =guid;
                    body.response=resp;
                    body.responsecode=Code;
                    
                    insertupdatesmsdet(body,context,function(err,rows){
                                console.log("resp after update updatesendSMS " + JSON.stringify(rows));
                                var bodyjson = JSON.parse(JSON.stringify(rows.body)); 
                                var resuljson = JSON.parse(bodyjson);
                                var result1 =JSON.parse(JSON.stringify(resuljson.result)); 

                                var updatecode = result1[0].o_errcode

                                // console.log("after update bodyjson " + bodyjson);
                                // console.log("after update resuljson "+ resuljson);
                                // console.log("after update  resuljson1 "+ JSON.stringify(result1));
                                // console.log(" after update  resuljson result1 "+result1[0]["o_errcode"]);
                                // console.log("after update  resuljson result2 "+result1[0].o_errcode);
                                // console.log("update code " +updatecode);
                                switch(updatecode)
                                {
                                    case 200:
                                                
                                        // console.log(req.body.smsid + 'update sms id');
                                        objresponse.body.status = 200;
                                        objresponse.body.result = result1;
                                        objresponse.body = JSON.stringify(objresponse.body);
                                        context.callbackWaitsForEmptyEventLoop = false;
                                        return callback(null, objresponse);
                                        break;
                                        default:
                                }

                        });

                    


                //return callback('',response.body);
    
            });

        }
        catch (ex) {
            console.log("Error " + ex);
        }
    }});
    function insertupdatesmsdet(event,context,callback){
    
        //console.log("call called");
        let response = util.getResObj();    
        const body = event;
       //console.log("guid " + body["guid"]);
       //console.log("guid 1 " + body.guid);

        const input = [body["smsid"],body["smstype"],body["mobileno"],body["message"],body["response"],body["responsecode"],body["guid"],"","","","","","","","",""];
        console.log("call input " + input);

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
                    conn.query("call proc_cm_smsinsert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", input, function (err, sqlResult) {
                        mysqlpool.release(conn);
                        if (err) {
                            let errMsg = "conn.query error in proc_cm_smsinsert";
                            console.log(errMsg, err);
                            response.body.status = 0;
                            response.body.error = err;
                            response.body.result = [];
                            response.body = JSON.stringify(response.body);
                            context.callbackWaitsForEmptyEventLoop = false;

                            return callback(null, response);
                        } else {
                            console.log("Success");
                            response.body.status = 200;
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
    
}
};

module.exports = reqHandler;