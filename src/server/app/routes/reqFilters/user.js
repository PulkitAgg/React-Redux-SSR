/**
 * Created by Suraj on 23/01/19.
 */
'use strict'
import userController from '../../modules/controllers/apiControllers/userControllers';
import resHandler from '../../modules/utils/resHandler';

import { matchPath } from "react-router-dom";
import routes from "../../../../react/routes";
import configureStore from "../../../../react/redux/configureStore";
// import "source-map-support/register";
import template from "../../../renderFunction/template";
import render from "../../../renderFunction/render";
import "@babel/polyfill";
import pool from "../../../dbconnection";

/**
 * handles ajax calls 
 */

const userRoutes = {

    "FetchUserInfo": async function (req, res) {
        try {

            let userData = await userController.fetchUserInfo();
            console.log("userData ----- ", userData)

            if (userData.length) {
                resHandler.sendRes(true, "data fetch", userData, {}, res);
            } else {
                resHandler.sendErr({}, 'Connection error', {}, res);
            }
        }
        catch (err) {
            resHandler.sendErr({}, 'Connection error', {}, res);
        }
    },

    "serverPages": async function (req, res, next) {
        const store = configureStore();
        const promises = routes.reduce((acc, route) => {
            if (matchPath(req.url, route) && route.component && route.component.initialAction) {
                acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
            }
            return acc;
        }, []);

        Promise.all(promises)
            .then(() => {
                const initialData = store.getState();
                const response = template("Server Rendered Page", initialData, render(req, store))
                res.send(response);
            })
            .catch(next);
    },

    "getCustomerData": function (req, res) {
        pool.getConnection((err, connection) => {
            if (err) {
                resHandler.sendErr({}, err, {}, res);
            } else {
                const query = "SELECT * FROM customers WHERE NAME = ?";
                connection.query(query, [req.params.name], (err, result, fields) => {
                    if (err) {
                        resHandler.sendErr({}, err, {}, res);
                    } else {
                        resHandler.sendRes(true, "Data of customer table", result, {}, res);
                    }
                });
            }
        })
    },

    "getCustomerDataByProcedure": function (req, res) {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                resHandler.sendErr({}, err, {}, res);
            } else {
                const query = `CALL getCustomerDataByName(?)`;
                connection.query(query, [req.params.name], (err, result, fields) => {
                    connection.release();
                    if (err) {
                        resHandler.sendErr({}, err, {}, res);
                    } else {
                        resHandler.sendRes(true, "Data of customer tabl111e", result, {}, res);
                    }
                });
            }
        })
    }
}
export default userRoutes;
