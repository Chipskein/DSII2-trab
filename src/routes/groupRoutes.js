const {Router} = require("express");
const router=Router();
const groupController=require('../controller/groupController.js');
const auth = require("../utils/auth.js");
const path =require('path');
const multer=require('multer');
const upload=multer({dest:`${path.resolve()}/uploads`});

router.get('/',groupController.showGroupAll)
router.get('/create',auth.isLogged,groupController.showcreateGroup)
router.post('/create',auth.isLogged,upload.single('photo'),groupController.createGroup)
router.get('/my',auth.isLogged,groupController.showMyGroups)

router.get('/:id',auth.isLogged,groupController.showGroup)
router.get('/:id/addmember',auth.isLogged,auth.isGroupAdmin,groupController.showAddMember)
router.post('/:id/addmember',auth.isLogged,auth.isGroupAdmin,groupController.AddMember)
router.get('/:id/rmMember/:userid',auth.isLogged,auth.isGroupAdminOrSelf,groupController.RmMember)
router.get('/:id/delete',auth.isLogged,auth.isGroupAdmin,groupController.deleteGroup)

module.exports=router;
