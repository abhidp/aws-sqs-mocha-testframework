import 'chai/register-should';
import { sendMessageAndGetResponse } from '../../actions/messages/sendMessage'
import { createQueueAndGetURL } from '../../actions/queues/createQueue'
import { receiveMessage, getMessageBody } from '../../actions/messages/receiveMessage'
import * as common from '../../util/common'

var queueUrl, messageResponse, messageId, queueName
const messageBody = common.generateRandomMessage()

describe('Tests for Receive Message Functionality', async () => {
  before('Send Message to an Existing Queue', async () => {
    queueName = common.generateRandomString()
    queueUrl = await createQueueAndGetURL(queueName)
    messageResponse = await sendMessageAndGetResponse(queueUrl, messageBody)
    messageId = messageResponse.MessageId
  })

  it('Should receive the exact message in the Response Body as sent', async () => {
    const receivedMsgs = await receiveMessage(queueUrl)
    const expectedMsgBody = await getMessageBody(receivedMsgs, messageId)

    receivedMsgs.should.be.an('array')
    messageBody.should.equal(expectedMsgBody)
  })

  it('Should throw error when MessageURL is not sent in ReceiveMessage parameters', async () => {
    const receivedMsgErr = await receiveMessage(undefined)

    receivedMsgErr.message.should.equal(`Missing required key 'QueueUrl' in params`)
  })
})