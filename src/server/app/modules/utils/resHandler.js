/**
 * Created by Suraj on 23/01/19.
 */
import httpStatus from 'http-status-codes';

const resHandler = {
    
    sendErr: function (status, msg,data, res) {
        var obj = {
            success: false,
            data: data || {},
            status: status || {},
            msg : msg || ""
        };
        res.status(status.code || 400)
        .send({success: obj.success, message: obj.msg, status : obj.status, data: obj.data});
    },
    sendRes: function (success, msg, data, statusObj, res) {
        res.status(httpStatus.OK)
        .send({success: success, message: msg, status : statusObj, data: data});
    }
}
export default resHandler;

// module.exports = new resHandler();