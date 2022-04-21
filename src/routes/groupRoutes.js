const {Router} = require("express");
const router=Router();
const groupController=require('../controller/groupController.js');
const auth = require("../utils/auth.js");

router.get('/',groupController.showGroupAll)
router.get('/create',auth.isLogged,groupController.showcreateGroup)
router.post('/create',auth.isLogged,groupController.createGroup)
module.exports=router;
