const {GroupDAO,GroupModel}=require('../model/groupModel');
const {GroupMembersDAO,GroupMembersModel}=require('../model/group_membersModel');
const {MessagesDAO}=require('../model/messagesModel');
const { UserDAO } = require('../model/userModel');
const imageUtils=require('../utils/image');
class GroupController{
  static async showGroupAll(req,res){
    let {offset}=req.query;
    if(!offset) offset=0;
    const total=await GroupDAO.countTotalGroups();
    const groups=await GroupDAO.getAllGroups(offset);
    return res.render('group/showGroupAll',{user:req.session.user,groups:groups,countGroups:total})
  }
  static async showMyGroups(req,res){
    let {offset}=req.query;
    if(!offset) offset=0;
    const user=req.session.user;
    const total=await GroupDAO.countTotalGroupsByUser(user.id);
    const groups=await GroupDAO.getAllGroupsByUser(user.id);
    return res.render('group/showGroupAll',{user:req.session.user,groups:groups,countGroups:total})
  }
  static async showcreateGroup(req,res){
    return res.render('group/createGroup',{error:false})
  }
  static async showGroup(req,res){
    const groupid= req.params.id;
    const user=req.session.user;
    let isMember=false;
    let permission=false;
    const groupData=await GroupDAO.getGroup(groupid);
    const groupMembers=await GroupMembersDAO.getGroupMembers(groupid);
    const messagesGroup=await MessagesDAO.getAllMessagesByGroup(groupid);
    const group={
      info:groupData,
      members:groupMembers,
      messages:messagesGroup
    }
    let userMember=groupMembers.filter(e => e.userid == user.id)[0];
    if(userMember){
      isMember=true;
      permission=userMember.userpermissions
    }
    return res.render('group/showGroup',{user,group,isMember,permission})
  }
  static async showAddMember(req,res){
    const groupid=req.params.id;
    return res.render('group/addMember',{groupid,error:false})
  }
  static async AddMember(req,res){
    const groupid=req.params.id;
    const {email,permissions}=req.body;
    const userInfo=await UserDAO.getInfoByEmail(email);
    if(userInfo){
      const model=new GroupMembersModel(userInfo.id,groupid,permissions);
      await GroupMembersDAO.insertGroupMember(model);
      return res.redirect(`/groups/${groupid}`);
    }
    else{
      return res.render('group/addMember',{groupid,error:{message:"User Don't Exists"}})
    }
  }
  static async RmMember(req,res){
    const userLogged=req.session.user;
    const groupid=req.params.id;
    const userid=req.params.userid;
    const group=await GroupDAO.getGroup(groupid);
    if(group.adminid!=userid){
      await GroupMembersDAO.removeGroupMember(userid,groupid);
      await MessagesDAO.removeAllMessagesFromGroupbyUser(userid,groupid)
      if(userid==userLogged) return res.redirect('/groups/my');
      else return res.redirect(`/groups/${groupid}`);
    }
  }
  static async deleteGroup(req,res){
    return res.status(200).json("DELETE");
  }
  static async createGroup(req,res){
    const file=req.file
    const {groupname}=req.body
    let img_link='https://polartalk.herokuapp.com/imgs/groupDefault.png';
    try{
        if(file!=undefined){
          if(file.mimetype=='image/gif'||file.mimetype=='image/png'||file.mimetype=='image/jpeg'){
              const response=await imageUtils.UploadImageToAPI(file);
              if(response.data.link) img_link=response.data.link;
          }
          else throw new Error('Invalid image mimetype')
        }
        const group=new GroupModel(null,groupname,req.session.user.id,img_link);
        const groupid=await GroupDAO.createGroup(group);
        const groupmember=new GroupMembersModel(req.session.user.id,groupid,'*')
        await GroupMembersDAO.insertGroupMember(groupmember);            
        return res.redirect(`/groups/${groupid}`);
    }
    catch(err){
      return res.render('group/createGroup',{error:err})
    }
  }
}
module.exports=GroupController;