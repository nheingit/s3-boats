import 'dotenv/config';
import AWS from 'aws-sdk';
// Set the region 
AWS.config.update({region: process.env.AWS_REGION});

// Create S3 service object
let s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

