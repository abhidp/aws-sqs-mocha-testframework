import { SQS, Credentials } from 'aws-sdk'

const awsCredentials = new Credentials(
  process.env.AWS_ACCESS_KEY_ID,
  process.env.AWS_SECRET_ACCESS_KEY
)

export const endpoint = process.env.ENDPOINT

export const sqs = new SQS({
  apiVersion: process.env.AWS_API_VERSION,
  credentials: awsCredentials,
  region: process.env.AWS_REGION,
  endpoint: endpoint
})