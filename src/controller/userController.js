const { hashSync,compareSync} = require('bcrypt');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
const userModel=require('../model/userModel');
class UserController{
    static login(req,res,next){}
    static logoff(req,res,next){}
    static register(req,res,next){}
    static showRegisterForm(req,res,next){
        return res.render('user/registerUser',{error:false});
    }
    static showLoginForm(req,res,next){
        return res.render('user/loginUser',{error:false});
    }
}
module.exports=UserController;