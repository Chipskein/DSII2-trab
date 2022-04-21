const { hashSync,compareSync} = require('bcrypt');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
const {GroupDAO,GroupModel}=require('../model/groupModel');
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
  static async createGroup(req,res){
    const data=req.body;
    return res.status(200).json(data);
    //return res.render('group/showGroupAll',{user:req.session.user,groups:groups,countGroups:total})
  }
}
module.exports=GroupController;