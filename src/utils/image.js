const imgbb_api_key='cc4a9adbc5da8cc8f1eda6e91189dbb9';
const imgbbUploadURL=`https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;
const { request }=require('https');
module.exports={
    uploadImage:async (req,res) =>{
        //send a POST with image and name to imgbb URL
    }
}