const {Router} = require("express");
const router=Router();
const groupController=require('../controller/groupController.js');
const auth = require("../utils/auth.js");

router.get('/',groupController.showGroupAll)
module.exports=router;
