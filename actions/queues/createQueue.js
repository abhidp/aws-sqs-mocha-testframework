import * as aws from '../../config/aws.conf'

export async function createQueueAndGetURL(queueName) {

  const params = {
    QueueName: queueName,
    Attributes: {
      DelaySeconds: '0',
      MessageRetentionPeriod: '3600'
    }
  }

  const createQueue = aws.sqs.createQueue(params).promise()

  return new Promise((resolve, reject) => {
    createQueue
      .then(
        (data) => {
          resolve(data.QueueUrl)
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