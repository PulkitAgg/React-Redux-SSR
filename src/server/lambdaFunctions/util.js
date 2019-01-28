/**
 * Created by Suraj on 20-01-2019.
 */
var crypto = require('crypto');
var node_cryptojs = require('node-cryptojs-aes');
var Hashids = require('hashids');
var CryptoJS = node_cryptojs.CryptoJS;
var JsonFormatter = node_cryptojs.JsonFormatter;
const AWS        = require('aws-sdk');

const util  = {
  env : process.env.ENV_VAL,
  envName : function(){
    if(util.env == "prod-"){
      return "prod";
    }else{
      return "dev";
    }
  },
  sqsBaseUrl : function(){
    return "https://sqs.ap-south-1.amazonaws.com/462296777538/" + util.env;
  },
  snsBaseUrl : function(){
    return "arn:aws:sns:ap-south-1:462296777538:" + util.env;
  },
  getResObj : function(){
      let response = {
          statusCode: 200,
          body: {
              message: 'Command executed successfully!',
              status: 1,
              err: "-",
              result: "-",
              resultinfo: "-"
          },
          headers: {
              "Access-Control-Allow-Origin": "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
          },
          isBase64Encoded: false
      };
      return response;
  },
  getOfferResObj : function(){
    let response = {
        statusCode: 200,
        body: {
            message: 'Command executed successfully!',
            status: 1,
            err: "-",
            offerlist: "-",
            banklist: "-",
            keyfeatures: "-",
            networklist: "-",
           feelist: "-"
        },
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        isBase64Encoded: false
    };
    return response;
},
  ISODateString : function(d){
      function pad(n) {return n<10 ? '0'+n : n}
      return d.getUTCFullYear()+'-'
          + pad(d.getUTCMonth()+1)+'-'
          + pad(d.getUTCDate())+'T'
          + pad(d.getUTCHours())+':'
          + pad(d.getUTCMinutes())+':'
          + pad(d.getUTCSeconds())+'Z'
  },
  PrintLog:function(msg,err){
      console.log(msg  + "-err-" +err);
  },
  getDateInString:function(date){
     var year = date.getFullYear();
     var month = (1 + date.getMonth()).toString();
     month = month.length > 1 ? month : '0' + month;
     var day = date.getDate().toString();
     day = day.length > 1 ? day : '0' + day;
     return  day+ '' +  month+ '' + year;
  },
  getMilliseconds:function(date){
      return  date.valueOf();
  },
  encryptData :function(data,callback){
     var s_data  =  JSON.stringify(data);
     var r_pass = CryptoJS.lib.WordArray.random(128/8).toString();
     var r_pass_base64 = r_pass.toString("base64");
     var encrypted = CryptoJS.AES.encrypt(s_data, r_pass_base64,{ format: JsonFormatter }); //val should be string
     var result = encrypted.toString();
     callback(r_pass_base64,result);
  },
  decryptData : function(encrypted_json_str,r_pass_base64){
    console.log(encrypted_json_str);
    var decrypted_data		 = CryptoJS.AES.decrypt(encrypted_json_str,r_pass_base64,{ format: JsonFormatter });
    var original_message 	 = JSON.parse(decrypted_data.toString(CryptoJS.enc.Utf8));
    console.log(original_message);
    return original_message;
  },
  getPanFromEncryptedData : function(encrypted_json_str,r_pass_base64){
      var data = util.decryptData(encrypted_json_str,r_pass_base64);
      console.log(data);
      var pan  =  data.pan;
      return pan;
  },
  checkAllReqParams : function(payload,arrayOfValidParams){
       var isValidReq  = true;
       for(var i=0;i<arrayOfValidParams.length;i++){
         if(!(payload.hasOwnProperty(arrayOfValidParams[i]) && arrayOfValidParams[i] !="")){
            isValidReq = false;
            break;
         }
       }
       return isValidReq;
  },
	createUniqueClientCode : function(pan){
		const panObj=pan;
		var hashids = new Hashids(panObj, 0, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'); // all lowercase
    return hashids.encode(1, 2, 3 ,4,5);
	},
  getISTTimestamp : function(){
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;   // IST offset UTC +5:30

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

    return ISTTime.toString();

  },
  returnModifiedBankObjConsumedInApplication : function(obj){
    var bajajObjStructure = {
        "AccountNumber": "-",
        "BankName": "-",
        "Branch": "-",
        "City": "-",
        "IFSCCode": "-",
        "MICRCode": "-"
    }

    var myAppObjStructure = { acctNo: "", bankName: "",bankBranch:"", accType: "SB", ifsCode: "", micr: "",bankCity:"",bankState:"" };

    myAppObjStructure['acctNo']      =  obj["AccountNumber"];
    myAppObjStructure['bankName']    =  obj["BankName"];
    myAppObjStructure['bankBranch']  =  obj["Branch"];
    myAppObjStructure['ifsCode']     =  obj["IFSCCode"];
    myAppObjStructure['micr']        =  obj["MICRCode"];
    myAppObjStructure['bankCity']    =  obj["City"];

    return myAppObjStructure;

  },
  returnRDSCrendtials:function(callback){

    var  endpoint = "https://secretsmanager.ap-south-1.amazonaws.com",
     region = "ap-south-1",
     secretName = "rds_instance_secret";

    // Create a Secrets Manager client
    var client = new AWS.SecretsManager({
       endpoint: endpoint,
       region: region
    });

    client.getSecretValue({SecretId: secretName}, function(err, data) {
        if(err) {
            if(err.code === 'ResourceNotFoundException')
                console.log("The requested secret " + secretName + " was not found");
            else if(err.code === 'InvalidRequestException')
                console.log("The request was invalid due to: " + err.message);
            else if(err.code === 'InvalidParameterException')
                console.log("The request had invalid params: " + err.message);
        }
        else {
            // Decrypted secret using the associated KMS CMK
            // Depending on whether the secret was a string or binary, one of these fields will be populated
            if(data.SecretString !== "") {
                secret = JSON.parse(data.SecretString);
               
                callback(secret.username,secret.password);
            }else {
                secret = JSON.parse(data.SecretBinary);
                console.log("in secret manager 2");
                //console.log(binarySecretData);
                callback(secret.username,secret.password);

            }
        }
    });
  }
};

module.exports = util;
