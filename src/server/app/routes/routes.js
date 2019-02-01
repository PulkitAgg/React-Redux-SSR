/**
 * Created by Suraj on 30/12/18.
 */
import express from 'express'
var router = express.Router();
// var fileParse = require('../middlewares/passFile');

import reqQuestionFilter from'./reqFilters/user';
// const reqQuestionFilter = require('./reqFilters/user')
// import userController from '../modules/controllers/ssrControllers/reactControllers';

// router.route('/')
//   .get(reqQuestionFilter.FetchUserInfo);

// router.route('*')
//   .get(reqQuestionFilter.serverPages);
//Questions route
router
    // .get('/api/news', reqQuestionFilter.FetchUserInfo)
    .get('/', reqQuestionFilter.serverPages)
    .get('/news', reqQuestionFilter.serverPages)
    .get('/*', reqQuestionFilter.serverPages)
export default router;
// module.exports = router;
