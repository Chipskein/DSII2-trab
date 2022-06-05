const fs=require('fs');
const {ImgurClient}=require('imgur')
const client = new ImgurClient(
    {
        clientId: process.env.IMGUR_CLIENT_ID,
        clientSecret: process.env.IMGUR_CLIENT_SECRET,
    }
);


module.exports={
    UploadImageToAPI:async (file) =>{
        const response = await client.upload(
            {
                image: fs.createReadStream(file.path),
                type: 'stream',
            }
        );
        fs.unlinkSync(file.path);
        return response
    },
        
}