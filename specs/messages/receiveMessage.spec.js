import 'chai/register-should';
import { sendMessageAndGetResponse } from '../../actions/messages/sendMessage'
import { createQueueAndGetURL } from '../../actions/queues/createQueue'
import { getAllMessagesFromQueue, getMessageById } from '../../actions/messages/receiveMessage'
import * as common from '../../util/common'

var queueUrl, messageResponse, messageId, queueName
const messageBody = 'Message Body ' + common.generateRandomMessage()

describe('Tests for Receive Message Functionality', async () => {
  before('Send Message to an Existing Queue', async () => {
    queueName = 'testqueue' + common.generateRandomString()
    queueUrl = await createQueueAndGetURL(queueName)
    messageResponse = await sendMessageAndGetResponse(queueUrl, messageBody)
    messageId = messageResponse.MessageId
  })

  it('Should SUCCESSfully receive the sent message', async () => {
    const receivedMsgsList = await getAllMessagesFromQueue(queueUrl)
    const expectedMessage = await getMessageById(receivedMsgsList, messageId)

    receivedMsgsList.should.be.an('array')
    messageBody.should.equal(expectedMessage.Body)
  })

  it('Should FAIL when MessageURL is not sent in ReceiveMessage parameters', async () => {
    const receivedMsgErr = await getAllMessagesFromQueue(undefined)

    receivedMsgErr.message.should.equal(`Missing required key 'QueueUrl' in params`)
    receivedMsgErr.code.should.equal('MissingRequiredParameter')
  })
})