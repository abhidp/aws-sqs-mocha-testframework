require('dotenv').config()
const AWS = require('aws-sdk')
const awsCredentials = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)
const endpoint = process.env.ENDPOINT


const sqs = new AWS.SQS({
  apiVersion: process.env.AWS_API_VERSION,
  credentials: awsCredentials,
  region: process.env.AWS_REGION,
  endpoint: endpoint
})
// Set the region

// Create an SQS service object
var queueURL = endpoint + '/queue/local';


var deleteParams = {
  QueueUrl: queueURL,
  ReceiptHandle: 'fa5de9e7-ade5-4b76-ac15-bb2dfbbdbd44#6031b229-c50d-4252-882f-02197ebcdb42'
};
sqs.deleteMessage(deleteParams, function (err, data) {
  if (err) {
    console.log("Delete Error", err);
  } else {
    console.log("Message Deleted", data);
  }
});