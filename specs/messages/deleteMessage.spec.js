import { expect } from 'chai'
import { sendMessageAndGetResponse } from '../../actions/messages/sendMessage'
import { createQueueAndGetURL } from '../../actions/queues/createQueue'
import { getAllMessagesFromQueue, getMessageById } from '../../actions/messages/receiveMessage'
import { deleteMessage } from '../../actions/messages/deleteMessage'
import * as common from '../../util/common'

var queueUrl, messageResponse, messageId, queueName, receivedMsgsList, getMsgDetails, receiptHandle
const messageBody = 'Test Message Body ' + common.generateRandomMessage()

describe('Tests for Receive Message Functionality', async () => {
  before('Send Message to an Existing Queue', async () => {
    queueName = 'testqueue' + common.generateRandomString()
    queueUrl = await createQueueAndGetURL(queueName)
    messageResponse = await sendMessageAndGetResponse(queueUrl, messageBody)
    messageId = messageResponse.MessageId
    receivedMsgsList = await getAllMessagesFromQueue(queueUrl)

    getMsgDetails = await getMessageById(receivedMsgsList, messageId)
    receiptHandle = getMsgDetails.ReceiptHandle
  })

  it('Should SUCCESSfully delete a Message', async () => {
    await deleteMessage(queueUrl, receiptHandle)
    const msgListAfteDeletion = await getAllMessagesFromQueue(queueUrl)
    const msgAfterDeletion = await getMessageById(msgListAfteDeletion, messageId)

    expect(msgAfterDeletion).to.be.undefined
  })

  it('Should FAIL when requested to Delete withou ReceiptHandle', async () => {
    const deleteWithoutReceiptHandle = await deleteMessage(queueUrl, undefined)

    expect(deleteWithoutReceiptHandle.message).to.equal(`Missing required key 'ReceiptHandle' in params`)
    expect(deleteWithoutReceiptHandle.code).to.equal('MissingRequiredParameter')
  })

})