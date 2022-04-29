const { hashSync,compareSync} = require('bcrypt');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
const {UserModel,UserDAO}=require('../model/userModel');
const imageUtils=require('../utils/image');
class UserController{
    static async login(req,res,next){
        const {email,password}=req.body;
        try{
            const user=await UserDAO.getInfoByEmail(email);
            if(user){
                const hashedpassord=user.password
                const verify=compareSync(password,hashedpassord)
                if(verify){
                    delete(user.password);
                    req.session.user=user;
                    return res.redirect('/');
                }
                else throw new Error('Invalid Credentials');
            }
            else throw new Error("User Don't Exists");
        }
        catch(err){
            return res.render('user/loginUser',{error:err})
        }
    }
    static async logoff(req,res,next){
        req.session.user=null;
        return res.redirect('/');
    }
    static async register(req,res,next){
        const file=req.file
        const {email,password,name}=req.body
        let img_link='https://polartalk.herokuapp.com/imgs/defaultUserProfile.png';
        try{
            const hashpassword=hashSync(password,10);
            const verifyUser=await UserDAO.getInfoByEmail(email);
            if(!verifyUser){
                if(file!=undefined){
                    if((file.mimetype=='image/gif'||file.mimetype=='image/png'||file.mimetype=='image/jpeg')){
                        const response=await imageUtils.UploadImageToAPI(file);
                        if(response.data.link) img_link=response.data.link;
                    }
                    else throw new Error('Invalid image mimetype');
                }
                const user=new UserModel(null,name,email,hashpassword,img_link)
                user.id=await UserDAO.registerUser(user);
                delete(user.password);
                req.session.user=user;
                return res.redirect('/');
            }
            else throw new Error('User Already Exists');
        }
        catch(err){
            return res.render('user/registerUser',{error:err});
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