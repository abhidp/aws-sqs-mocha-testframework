const aws = require('../../config/aws.conf')

var queueURL = 'http://localhost:9324/queue/mqelastic'


async function deleteParams() {

  const msgData = await msg.receiveMessage()
  const receiptHandle = msgData[0].ReceiptHandle

  var deleteParams = {
    QueueUrl: queueURL,
    ReceiptHandle: receiptHandle
  }

  var deleteMsgPromise = aws.sqs.deleteMessage(deleteParams).promise()

  return new Promise((resolve, reject) => {
    // Handle promise's fulfilled/rejected states
    deleteMsgPromise
      .then(
        function (data) {
          console.log('Message Deleted', data);
          resolve(data)
        }
      )
      .catch(
        function (err) {
          console.log('Delete Error', err)
          reject(err)
        }
      )
  })
}

deleteParams()

