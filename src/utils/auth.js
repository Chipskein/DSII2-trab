module.exports={
    isLogged:async (req,res,next)=>{
        try{    
            const session=req.session;
            if(session.user!=null) next();
            else throw Error('401 | You need be logged to access this resource')
        }
        catch(err){    
            console.log(err);
        }
    },
    isGroupAdmin:async (req,res,next)=>{
        try{
           const user=req.session.user
           if(user.role=='admin') next();
           else throw Error('401 | Unauthorized') 
        }
        catch(err){
            console.log(err);
        }
    },
    isGroupMember:async (req,res,next)=>{
        try{
           const user=req.session.user
           if(user.role=='admin') next();
           else throw Error('401 | Unauthorized') 
        }
        catch(err){
            console.log(err);

        }
    },
    isNotLogged:(req,res,next)=>{
        try{    
            const session=req.session;
            if(session.user==null) next();
            else throw Error('200 | You are already Logged')
        }
        catch(err){    
            console.log(err);
        }
    },
    disableCache:(req,res,next)=>{
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}
