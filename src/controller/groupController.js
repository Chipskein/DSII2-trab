const { hashSync,compareSync} = require('bcrypt');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
const groupModel=require('../model/groupModel');
class GroupController{
  
}
module.exports=GroupController;