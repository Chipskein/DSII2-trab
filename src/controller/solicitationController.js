const {GroupDAO,GroupModel}=require('../model/groupModel');
const {GroupMembersDAO,GroupMembersModel}=require('../model/group_membersModel');
const {GroupSolicitationDAO,GroupSolicitationModel}=require('../model/group_solicitationsModel');
const {MessagesDAO}=require('../model/messagesModel');
const { UserDAO } = require('../model/userModel');
class SolicitationController{
    static async sendSolicitation(req,res){
        const {userid,txt,groupid}=req.body
        let model=new GroupSolicitationModel(userid,groupid,txt,'waiting')
        await GroupSolicitationDAO.sendGroupSolitation(model)
        return res.redirect('/');
    }
    static async showSolicitations(req,res){
        const groupid=req.params.id;
        const solicitations=await GroupSolicitationDAO.getAllSolicitations(groupid);
        console.log(solicitations);
        return res.render('solicitations/showSolicitations',{user:req.session.user,solicitations})
    }
    static async updateSolicitation(req,res){
        const groupid=req.params.id;
        const {userid,status}=req.body;
        if(status=='refused') await GroupSolicitationDAO.refuseSolicitation(userid,groupid);
        else if(status=='accepted'){
            await GroupSolicitationDAO.acceptSolicitation(userid,groupid);
            let model=new GroupMembersModel(userid,groupid,'RW');
            await GroupMembersDAO.insertGroupMember(model);
        }
        return res.redirect('/solicitations/'+groupid);
    }
}
module.exports=SolicitationController;