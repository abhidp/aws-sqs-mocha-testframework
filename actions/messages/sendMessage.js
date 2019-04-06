import * as aws from '../../config/aws.conf'

export async function sendMessageAndGetResponse(queueURL, messageBody) {

  var params = {
    DelaySeconds: 0,
    QueueUrl: queueURL,
    MessageBody: messageBody
  }

  const sendMessage = aws.sqs.sendMessage(params).promise()

  return new Promise((resolve, reject) => {
    sendMessage
      .then(
        (data) => {
          resolve(data)
        }
      )
      .catch(
        (err) => {
          resolve(err) //resolve into re-usable value test validation rather than rejecting and stopping the process
          // reject(err)
        }
      )
  })
}