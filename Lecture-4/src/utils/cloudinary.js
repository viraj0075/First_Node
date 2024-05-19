import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (locaFilePath) => {
    try{
      if(!locaFilePath) return null;
      //upload the file path on cloudinary 
      const resCloud = await cloudinary.uploader.upload(locaFilePath,{
        resource_type:"auto"
      });
      console.log(resCloud.url,"File is Upload Successfully");
      fs.unlinkSync(locaFilePath); 
      return resCloud;
    }
    catch(error){
      fs.unlink(locaFilePath)
      //remove the locally temp file as the upload opreation got failed
      return null;
    }
}

export {uploadOnCloudinary}