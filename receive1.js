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

var params = {
  AttributeNames: [
    "SentTimestamp"
  ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [
    "All"
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function (err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    console.log('MSG Received===', data.Messages)
    /* var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, function (err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    }); */
  }
});


/* var deleteParams = {
  QueueUrl: queueURL,
  ReceiptHandle: 'b39c3b2b-9b56-4067-b729-04e57bd43390#3c8fdf9b-3e84-4ca7-ad3d-d01cf8830f15'
};
sqs.deleteMessage(deleteParams, function (err, data) {
  if (err) {
    console.log("Delete Error", err);
  } else {
    console.log("Message Deleted", data);
  }
}); */