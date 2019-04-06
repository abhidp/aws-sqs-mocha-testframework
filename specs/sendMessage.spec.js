import 'chai/register-should';
import { sendMessageAndGetResponse } from '../actions/sendMessage'
import { createQueueAndGetURL } from '../actions/createQueue'

var queueUrl, msgResponseErr
const messageBody = 'I am the road warrior'

describe('Tests for Send Message Functionality', async () => {
  before('Create Queue to Send Message to', async () => {
    queueUrl = await createQueueAndGetURL('madmax')
  })

  it('Should return a valid response upon successful Sending Message', async () => {
    const msgResponse = await sendMessageAndGetResponse(queueUrl, messageBody)

    msgResponse.should.be.an('object')
    msgResponse.should.have.all.keys(
      'ResponseMetadata',
      'MD5OfMessageBody',
      'MD5OfMessageAttributes',
      'MessageId'
    )
  })

  it('Should throw Error when MessageBody is missing', async () => {
    msgResponseErr = await sendMessageAndGetResponse(queueUrl, undefined)

    msgResponseErr.message.should.equal(`Missing required key 'MessageBody' in params`)
    msgResponseErr.code.should.equal('MissingRequiredParameter')
  })

  it('Should throw error when MessageURL is not sent in parameters', async () => {
    msgResponseErr = await sendMessageAndGetResponse(undefined, messageBody)

    msgResponseErr.message.should.equal(`Missing required key 'QueueUrl' in params`)
    msgResponseErr.code.should.equal('MissingRequiredParameter')
  })
})