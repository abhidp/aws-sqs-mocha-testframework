import * as aws from '../../config/aws.conf'

export async function getAllMessagesFromQueue(queueUrl) {
  var params = {
    AttributeNames: [
      'SentTimestamp'
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
      'All'
    ],
    QueueUrl: queueUrl,
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
            resolve('No Messages In Queue')
          } else {
            resolve(data.Messages)
          }
        })
      .catch(
        function (err) {
          resolve(err) //resolve into re-usable value test validation rather than rejecting and stopping the process
          // reject(err)
        }
      )
  })
}

export async function getMessageById(receivedMsgs, messageId) {
  const length = receivedMsgs.length

  for (let i = 0; i < length; i++) {
    if (receivedMsgs[i].MessageId === messageId) {
      // console.log('receivedMsgs[i]', receivedMsgs[i])
      return receivedMsgs[i]
    }
  }
}