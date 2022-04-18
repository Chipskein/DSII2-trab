const { hashSync,compareSync} = require('bcrypt');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
const userModel=require('../model/userModel');
class UserController{
    static async cadastrar(req,res){
        let {email,password,image,name}=req.body;
        const UserExists=database.users.find(user=>user.email==email);
        if(!UserExists){
            const hashPassword=hashSync(password,10);
            if(!image) image='/imgs/woman.png';
            const user={
                id:nanoid(),
                role:"user",
                name:name,
                email:email,
                password:hashPassword,
                image:image,
                created:new Date(),
                updated:new Date()
            }
            database.users.push(user);
            res.redirect('/');
        }
        else{
            res.render('register.ejs',{error:{message:"User Already Exists"}});
        }
    }
    static async login(req,res){
        const {email,password}=req.body;
        const users=database.users;
        const user=users.find(user=>user.email==email)
        if(user&&password){
            const passed=compareSync(password,user.password);
            if(passed){
                req.session.user=user;
                res.redirect('/');
            }
            else{
                res.render('login.ejs',{error:{message:"Invalid Credentials"}});
            }
        }
        else{
            res.render('login.ejs',{error:{message:"User Don't Exists"}});
        }
    }
    static async logoff(req,res){
        if(req.session.user){
            req.session.user=null;
            req.session.destroy();
            console.log("DESLOGADO")
        }
        res.redirect('/');
    }
    static async getUserPerfil(req,res){
        const {id}=req.params;
        let self=false
        const user=database.users.filter(user=>user.id==id)[0];
        if(req.session.user&&req.session.user.id==user.id) self=true;       
        res.render('perfil.ejs',{self:self,user:user,session_user:req.session.user});
    }
    static async getUsersManager(req,res){
        const users=database.users;
        const userSelf=req.session.user;
        res.render('gerenciar-users.ejs',{users:users,user:userSelf});
    }
    static async deletar(req,res){
        const { id } = req.params;
        const user=req.session.user;
        const userIdx = database.users.findIndex(f => f.id == id);
        database.users.splice(userIdx, 1);
        if(user.id==id){
            return res.redirect('/users/logoff');
        }
        return res.redirect('/users/gerenciar');
    }
    static async editar(req,res){
        const {id}=req.params;
        const {email,name,password,image}=req.body;
        const user=database.users.filter(u=>u.id==id)[0];
        if(email) user.email=email;
        if(name) user.name=name;
        if(image) user.image=image;
        if(password){
            const hashPassword=hashSync(password,10);
            user.password=hashPassword;
        }
        //caso for o mesmo usuario->atualiza sessão
        if(req.session.user.id==id) req.session.user=user;
        user.updated=new Date();
        //update all reviews from user;
        database.mangas.forEach(manga=>{
            const tmp=manga.reviews.filter(review=>review.user.id==id)
            tmp.forEach(review=>{
                review.user=user;
            })            
        })
        res.redirect(`/users/${id}`);
    }
    static async mostrar_editar(req,res){
        const { id } = req.params;
        const user = database.users.filter(f => f.id == id)[0];
        res.render('user_mostrar_editar.ejs',{user:user});
    }
    static async mostrar_cadastrar(req,res){
        res.render('register.ejs',{error:false});
    }
    static async mostrar_login(req,res){
        res.render('login.ejs',{error:false});
    }
    static async promote(req,res){
        const { id } = req.params;
        const user = database.users.filter(f => f.id == id)[0];
        user.role='admin';
        res.redirect('/users/gerenciar');
    }
    static async despromote(req,res){
        const { id } = req.params;
        const user = database.users.filter(f => f.id == id)[0];
        user.role='user';
        if(id==req.session.user.id){
            req.session.user=user
            res.redirect(`/manga`);
        }
        else res.redirect('/users/gerenciar');
    }
}
module.exports=UserController;