const imgbb_api_key='cc4a9adbc5da8cc8f1eda6e91189dbb9';
const imgbbUploadURL=`https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;
const imgbbUploader = require("imgbb-uploader");
const fs=require('fs');
module.exports={
    UploadImageToIMGBB:async (file) =>{
        const response=await imgbbUploader(imgbb_api_key,file.path)
        fs.rmSync(file.path);
        return response
    },
        
}