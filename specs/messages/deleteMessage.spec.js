import 'chai/register-should';
import { sendMessageAndGetResponse } from '../../actions/messages/sendMessage'
import { createQueueAndGetURL } from '../../actions/queues/createQueue'
import { receiveMessage, getMessage } from '../../actions/messages/receiveMessage'
import { deleteMessage } from '../../actions/messages/deleteMessage'
import * as common from '../../util/common'

var queueUrl, messageResponse, messageId, queueName, receivedMsgsList, getMsgDetails
const messageBody = 'Test Message Body ' + common.generateRandomMessage()

describe('Tests for Receive Message Functionality', async () => {
  before('Send Message to an Existing Queue', async () => {
    queueName = 'testqueue' + common.generateRandomString()
    queueUrl = await createQueueAndGetURL(queueName)
    messageResponse = await sendMessageAndGetResponse(queueUrl, messageBody)
    messageId = messageResponse.MessageId
    receivedMsgsList = await receiveMessage(queueUrl)
    getMsgDetails = await getMessage(receivedMsgsList, messageId)
    console.log('BEFORE MESSAGE===', getMsgDetails)

  })

  it('Should SUCCESSfully delete a Message', async () => {
    const receiptHandle = getMsgDetails.ReceiptHandle
    const delMsg = await deleteMessage(queueUrl, receiptHandle)
    // console.log('delMsg==', delMsg)
    getMsgDetails = await getMessage(receivedMsgsList, messageId)
    console.log('AFTER MESSAGE===', getMsgDetails)


  })

})