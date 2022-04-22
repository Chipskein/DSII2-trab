const {Router} = require("express");
const router=Router();
const messageController=require('../controller/messageController.js');
const auth = require("../utils/auth.js");
router.post('/',messageController.registerMessage)
module.exports=router;
