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

const bucketParams = {
  Bucket: "icantcomeupwithabucketnameisweartogod",
};
//Not able to finish this clear bucket so I can't delete the bucket yet.
function clearBucket (client, bucket) {
        client.listObjects({Bucket: bucket}, function (err, data) {
            if (err) {
                console.log("error listing bucket objects "+err);
                return;
            }
            var items = data.Contents;
            for (var i = 0; i < items.length; i += 1) {
                var deleteParams = {Bucket: bucket, Key: items[i].Key};
                client.deleteObject(client, deleteParams);
            }
        });
    }
//getting a callback.call type error I don't quite understand
clearBucket(s3, bucketParams.Bucket)

s3.deleteBucket(bucketParams, (err, data)=>{

if (err){
  console.error("Error:", err.stack)
} if (data){
  console.log("we deleted the things:", data)
}})
