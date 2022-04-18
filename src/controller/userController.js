const { hashSync,compareSync} = require('bcrypt');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
const userModel=require('../model/userModel');
const imageUtils=require('../utils/image');
class UserController{
    static async login(req,res,next){
        return res.status(200).json(req.body)
    }
    static async logoff(req,res,next){}
    static async register(req,res,next){
        const file=req.file
        const {email,password,name}=req.body
        try{
            console.log(file);
            const mimetype=file.mimetype;
            const filesize=file.size;
            if(mimetype=='image/gif'||mimetype=='image/png'||mimetype=='image/jpeg'){
                const response=await imageUtils.UploadImageToIMGBB(file);
                return res.status(200).json(response);
            }
            else throw new Error('Invalid image mimetype')
        }
        catch(err){
            console.log(err.response);
        }
    }
    static showRegisterForm(req,res,next){
        return res.render('user/registerUser',{error:false});
    }
    static showLoginForm(req,res,next){
        return res.render('user/loginUser',{error:false});
    }
}
module.exports=UserController;