const { hashSync,compareSync} = require('bcrypt');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
const groupModel=require('../model/groupModel');
class GroupController{
  static showGroupAll(req,res){
    console.log(req.session.user)
    return res.render('group/showGroupAll',{user:req.session.user})
  }
}
module.exports=GroupController;