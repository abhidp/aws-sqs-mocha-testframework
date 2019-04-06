const aws = require('../config/aws.conf')

// var queueURL = aws.endpoint + '/queue/mqelastic'

export async function receiveMessage(QueueUrl) {
  var params = {
    AttributeNames: [
      'SentTimestamp'
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
      'All'
    ],
    QueueUrl: QueueUrl,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  }
  // Create a promise on ReceiveMessage service object
  var receiveMsgPromise = aws.sqs.receiveMessage(params).promise()

  return new Promise((resolve, reject) => {
    // Handle promise's fulfilled/rejected states
    receiveMsgPromise
      .then(
        function (data) {
          if (data.Messages === undefined) {
            console.log('No Messages in the Queue')
          } else {
            // console.log('data.Messages==', data.Messages)
            // receiptHandle = data.Messages[0].ReceiptHandle
            resolve(data.Messages)
          }
        }
      )
      .catch(
        function (err) {
          resolve(err)
          // reject(err)
        }
      )
  })
}


export async function getMessageBody(receivedMsgs, messageId) {
  const length = receivedMsgs.length
  for (let i = 0; i < length; i++) {
    if (receivedMsgs[i].MessageId === messageId) {
      return receivedMsgs[i].Body
    }
  }
}