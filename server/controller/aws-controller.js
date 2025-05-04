import AWS from "aws-sdk";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();


const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  
  export const generateUploadURL = async (req, res) => {
    try {
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

    const params = {
      Bucket: "bloggingweb",
      Key: imageName,
      Expires: 1000,
      ContentType: "image/jpeg", 
    };
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    res.status(200).json({ uploadURL, key: imageName });
  }catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).json({ msg: "Failed to generate upload URL" });
  }
};
  