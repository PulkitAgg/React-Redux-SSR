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

/**
 * handles ajax calls 
 */

 const userRoutes = {

    "FetchUserInfo" : async function(req, res){
        try{

            let userData = await userController.fetchUserInfo();
            console.log("userData ----- ",userData)

            if(userData.length){
                resHandler.sendRes(true, "data fetch", userData, {}, res);
            }else{
                resHandler.sendErr({},'Connection error',{},res);
            }
        }
        catch(err){
            resHandler.sendErr({},'Connection error',{},res);
        }
    },

    "serverPages" : async function(req, res, next){
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
    }
 }
 export default userRoutes;

//  module.exports = new QuestionsRoutes()
