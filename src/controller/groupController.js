const {GroupDAO,GroupModel}=require('../model/groupModel');
const {GroupMembersDAO,GroupMembersModel}=require('../model/group_membersModel');
const {MessagesDAO}=require('../model/messagesModel');
const imageUtils=require('../utils/image');
class GroupController{
  static async showGroupAll(req,res){
    let {offset}=req.query;
    if(!offset) offset=0;
    const total=await GroupDAO.countTotalGroups();
    const groups=await GroupDAO.getAllGroups(offset);
    return res.render('group/showGroupAll',{user:req.session.user,groups:groups,countGroups:total})
  }
  static async showcreateGroup(req,res){
    return res.render('group/createGroup',{error:false})
  }
  static async showGroup(req,res){
    const groupid= req.params.id;
    const user=req.session.user;
    const groupData=await GroupDAO.getGroup(groupid);
    const groupMembers=await GroupMembersDAO.getGroupMembers(groupid);
    const messagesGroup=await MessagesDAO.getAllMessagesByGroup(groupid);
    const group={
      info:groupData,
      members:groupMembers,
      messages:messagesGroup
    }
    let isMember=groupMembers.some(e => e.userid == user.id);
    return res.render('group/showGroup',{user:user,group:group,isMember:isMember})
  }
  static async showAddMember(req,res){
    return res.status(200).json("SHOW ADD MEMBER FORM");
  }
  static async deleteGroup(req,res){
    return res.status(200).json("DELETE");
  }
  static async createGroup(req,res){
    const file=req.file
    const {groupname}=req.body
    let img_link='https://polartalk.herokuapp.com/imgs/groupDefault.png';
    try{
        const mimetype=file.mimetype;
        if(mimetype=='image/gif'||mimetype=='image/png'||mimetype=='image/jpeg'){
            const response=await imageUtils.UploadImageToAPI(file);
            if(response.data.link) img_link=response.data.link;
            const group=new GroupModel(null,groupname,req.session.user.id,img_link);
            const groupid=await GroupDAO.createGroup(group);
            const groupmember=new GroupMembersModel(req.session.user.id,groupid,'*')
            await GroupMembersDAO.insertGroupMember(groupmember);            
            return res.redirect(`/groups/${groupid}`);
        }
        else throw new Error('Invalid image mimetype')
    }
    catch(err){
        console.log(err.response);
    }
  }
}
module.exports=GroupController;