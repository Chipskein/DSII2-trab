const fs=require('fs');
const {ImgurClient}=require('imgur')
const client = new ImgurClient(
    {
        clientId: '430c247687d3cf1',
        clientSecret: '8a20068c2229c2786afed30284eeb25d07a0a7df',
    }
);


module.exports={
    UploadImageToIMGBB:async (file) =>{
        const response = await client.upload(
            {
                image: fs.createReadStream(file.path),
                type: 'stream',
            }
        );
        fs.rmSync(file.path);
        return response
    },
        
}