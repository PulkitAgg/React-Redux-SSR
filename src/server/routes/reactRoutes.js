import express from "express";
import reactController from "../controllers/reactControllers";

var router = express.Router();

//API for react.
router.route('/')
  .get(reactController);

router.route('/news')
  .get(reactController);

export default router;
