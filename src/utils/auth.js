const { GroupDAO } = require("../model/groupModel");
const { GroupMembersDAO } = require("../model/group_membersModel");

module.exports={
    isLogged:async (req,res,next)=>{
        try{    
            const session=req.session;
            if(session.user!=null) next();
            else throw Error('401 | You need be logged to access this resource')
        }
        catch(err){    
            return res.render('error',{error:err})
        }
    },
    isGroupAdmin:async (req,res,next)=>{
        try{
           const user=req.session.user
           const {id}=req.params;
           const group=await GroupDAO.getGroup(id);
           if(group.adminid==user.id) next();
           else throw Error('401 | Unauthorized') 
        }
        catch(err){
            return res.render('error',{error:err})
        }
    },
    isGroupMember:async (req,res,next)=>{
        try{
           const user=req.session.user
           const {id}=req.params;
           const verify=await GroupMembersDAO.verifyIfUserIsMember(user.id,id);
           if(verify) next();
           else throw Error('401 | Unauthorized') 
        }
        catch(err){
            return res.render('error',{error:err})

        }
    },
    isNotLogged:(req,res,next)=>{
        try{    
            const session=req.session;
            if(session.user==null) next();
            else throw Error('200 | You are already Logged')
        }
        catch(err){    
            return res.render('error',{error:err})
        }
    },
    disableCache:(req,res,next)=>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}
