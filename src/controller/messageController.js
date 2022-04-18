const { hashSync,compareSync} = require('bcrypt');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
const messageModel=require('../model/messageModel');
class MessageController{
   
}
module.exports=MessageController;