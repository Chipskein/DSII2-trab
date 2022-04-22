const { MessagesDAO,MessagesModel } = require("../model/messagesModel");
MessagesDAO
class MessageController{
   static async registerMessage(req,res){
        const {userid,groupid,txt}=req.body;
        const messagemodel= new MessagesModel(null,txt,userid,groupid);
        await MessagesDAO.registerMessage(messagemodel);
        return res.redirect(`/groups/${groupid}`);
   }
}
module.exports=MessageController;