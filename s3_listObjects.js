require('dotenv').config()
var AWS = require('aws-sdk');
// Set the config up
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//make a new s3 object
s3 = new AWS.S3({apiVersion: '2006-03-01'})

const bucketParams = {
  Bucket: "icantcomeupwithabucketnameisweartogod",
};

//Lets try to read out the objects I just put in the new bucket

s3.listObjects(bucketParams, (err, data)=>{
  if (err){
    console.error("Error", err, err.stack)
  } else {
    console.log("we read some boats", data);
  }
});