const { GroupMembersDAO } = require("../model/group_membersModel");
const { MessagesDAO,MessagesModel } = require("../model/messagesModel");
class MessageController{
   static async registerMessage(req,res){
        const {userid,groupid,txt}=req.body;
        const gm=await GroupMembersDAO.getMemberPermissions(userid,groupid);
        if(gm&&(gm.permissions=='*'||gm.permissions=='RW')){
            const messagemodel= new MessagesModel(null,txt,userid,groupid);
            await MessagesDAO.registerMessage(messagemodel);
        }
        return res.redirect(`/groups/${groupid}`);
   }
}
module.exports=MessageController;