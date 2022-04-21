const {GroupDAO,GroupModel}=require('../model/groupModel');
const imageUtils=require('../utils/image');
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
    const file=req.file
    const {name}=req.body
    let img_link='https://polartalk.herokuapp.com/imgs/groupDefault.png';
    try{
        const mimetype=file.mimetype;
        if(mimetype=='image/gif'||mimetype=='image/png'||mimetype=='image/jpeg'){
            const response=await imageUtils.UploadImageToIMGBB(file);
            if(response.data.link) img_link=response.data.link;
            const group=new GroupModel(null,name,req.session.user.id,img_link)
            group.id=await GroupDAO.createGroup(group);
            return res.redirect('/')
        }
        else throw new Error('Invalid image mimetype')
    }
    catch(err){
        console.log(err.response);
    }
  }
}
module.exports=GroupController;