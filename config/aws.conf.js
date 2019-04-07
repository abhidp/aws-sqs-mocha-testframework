require('dotenv').config()
const AWS = require('aws-sdk')
const awsCredentials = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)
export const endpoint = process.env.ENDPOINT

export const sqs = new AWS.SQS({
  apiVersion: process.env.AWS_API_VERSION,
  credentials: awsCredentials,
  region: process.env.AWS_REGION,
  endpoint: endpoint
})