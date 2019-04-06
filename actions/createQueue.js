import * as aws from '../config/aws.conf'

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
          resolve(err)
          // reject(err)
        }
      )
  })
}