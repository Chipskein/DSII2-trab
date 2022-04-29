const {Router} = require("express");
const router=Router();
const userController=require('../controller/userController.js');
const auth = require("../utils/auth.js");
const path=require('path');
const multer=require('multer')
const upload=multer({dest:`${path.resolve()}/uploads`})
router.get('/login',auth.disableCache,auth.isNotLogged,userController.showLoginForm);
router.get('/register',auth.disableCache,auth.isNotLogged,userController.showRegisterForm);
router.get('/logoff',auth.disableCache,auth.isLogged,userController.logoff);
router.post('/register',auth.disableCache,auth.isNotLogged,upload.single('photo'),userController.register);
router.post('/login',auth.disableCache,auth.isNotLogged,userController.login);
module.exports=router;
