/**
 * Created by Suraj on 30/12/18.
 */
import express from 'express'
var router = express.Router();
import cacheMiddleware from './cacheService'

// var fileParse = require('../middlewares/passFile');

import reqQuestionFilter from'./reqFilters/user';
// const reqQuestionFilter = require('./reqFilters/user')
// import userController from '../modules/controllers/ssrControllers/reactControllers';

router.route('/news')
  .get(cacheMiddleware(30),reqQuestionFilter.FetchUserInfo);

// router.route('*')
//   .get(reqQuestionFilter.serverPages);
//Questions route
// router
//     .get('/news', reqQuestionFilter.FetchUserInfo)
export default router;
// module.exports = router;
