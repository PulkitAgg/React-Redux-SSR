import con from "./dbconnection";

var query = [];
const deleteCustomer = `DROP PROCEDURE IF EXISTS getCustomerDataByName`;
query.push(deleteCustomer);

const addCustomer = `CREATE PROCEDURE getCustomerDataByName (IN inputName VARCHAR(25))
SELECT * FROM customers WHERE name = inputName`;
query.push(addCustomer);

// Run the script
for (var i = 0; i < query.length; i++) {
    console.log(query[i]);
    con.query(query[i], function (err, rows, fields) {
        if (!err) {
            console.log("success"); //emails succeeds, as do other create table commands
        } else {
            console.log('Error while performing Query.'); //any queries that create stored procedures fail
            console.log(err.code);
            console.log(err.message);
        }
    });
}
exports.query = query;