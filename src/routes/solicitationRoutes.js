const {Router} = require("express");
const router=Router();
const auth = require("../utils/auth.js");
const solicitationController = require("../controller/solicitationController.js");

router.get('/:id',auth.isLogged,auth.isGroupAdmin,solicitationController.showSolicitations);
router.post('/',auth.isLogged,solicitationController.sendSolicitation);
router.post('/update/:id',auth.isLogged,auth.isGroupAdmin,solicitationController.updateSolicitation);

module.exports=router;
