require('dotenv').config()
const AWS = require('aws-sdk')
const myCredentials = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)
export const endpoint = 'http://localhost:9324'

export const sqs = new AWS.SQS({
  apiVersion: process.env.AWS_API_VERSION,
  credentials: myCredentials,
  region: process.env.AWS_REGION,
  endpoint: endpoint
})

/* module.exports = {
  sqs,
  endpoint
} */