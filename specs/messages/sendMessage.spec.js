import 'chai/register-should'
import * as common from '../../util/common'
import { sendMessageAndGetResponse } from '../../actions/messages/sendMessage'
import { createQueueAndGetURL } from '../../actions/queues/createQueue'

var queueUrl, msgResponseErr
const messageBody = 'Message Body ' + common.generateRandomMessage()

describe('Tests for SEND Message', async () => {
  before('Create a Queue to Send Message to', async () => {
    const queueName = 'testqueue' + common.generateRandomString()
    queueUrl = await createQueueAndGetURL(queueName)
  })

  it('Should return a valid response upon SUCCESSful Sending Message', async () => {
    const msgResponse = await sendMessageAndGetResponse(queueUrl, messageBody)

    msgResponse.should.be.an('object')
    msgResponse.should.have.all.keys(
      'ResponseMetadata',
      'MD5OfMessageBody',
      'MD5OfMessageAttributes',
      'MessageId'
    )
  })

  it('Should FAIL when MessageBody is missing', async () => {
    msgResponseErr = await sendMessageAndGetResponse(queueUrl, undefined)

    msgResponseErr.message.should.equal(`Missing required key 'MessageBody' in params`)
    msgResponseErr.code.should.equal('MissingRequiredParameter')
  })

  it('Should FAIL when MessageURL is not sent in parameters', async () => {
    msgResponseErr = await sendMessageAndGetResponse(undefined, messageBody)

    msgResponseErr.message.should.equal(`Missing required key 'QueueUrl' in params`)
    msgResponseErr.code.should.equal('MissingRequiredParameter')
  })
})