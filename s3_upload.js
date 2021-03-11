require('dotenv').config()
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

//S3 needs to upload file to bucket I specify
const uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
const file = process.argv[3];

//ltes go ahead and do some file stuff
const fs = require('fs');
const fileStream = fs.createReadStream(file);
fileStream.on("error", (err)=>{
  console.log("file error", err);
});

uploadParams.Body = fileStream;
//TODO make this an import and move to top of file
var path = require('path');
uploadParams.Key = path.basename(file);

//now that i'm done with file stuff lets go to uploading it to my bucket
s3.upload(uploadParams, (err, data)=>{
  if(err){
    console.error("error", err.stack)
  } if (data) {
    console.log("upload success, location is : ", data.Location)
    console.log(data);
  }
})
