import * as aws from '../../config/aws.conf'

export async function deleteMessage(queueURL, receiptHandle) {

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
          resolve(data)
        }
      )
      .catch(
        function (err) {
          console.log('Delete Error', err)
          resolve(err)
          // reject(err)
        }
      )
  })
}