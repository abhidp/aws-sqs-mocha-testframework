import { expect } from 'chai'
import * as aws from '../../config/aws.conf'
import * as common from '../../util/common'
import { createQueueAndGetURL } from '../../actions/queues/createQueue'

describe('Tests for Creating a Message Queue', async () => {

  it('Should return a SUCCESSful response for valid Queue creation Request', async () => {
    const queueName = 'testqueue' + common.generateRandomString() //generate a random name everytime to avoid  "Queue Already Exists Error"
    const queueURL = await createQueueAndGetURL(queueName)
    const expectedQueueURL = aws.endpoint + '/queue/' + queueName

    expect(queueURL).to.equal(expectedQueueURL)
  })

  it('Should FAIL with Error Messages when QueueName is missing', async () => {
    const createQueueErr = await createQueueAndGetURL(undefined)

    expect(createQueueErr.message).to.equal(`Missing required key 'QueueName' in params`)
    expect(createQueueErr.code).to.equal('MissingRequiredParameter')
  })

  it('Should FAIL with Error Messages when QueueName has a space in the name', async () => {
    const queueNameHasSpaceErr = await createQueueAndGetURL('abc xyz')

    expect(queueNameHasSpaceErr.statusCode).to.equal(400)
    expect(queueNameHasSpaceErr.message).to.equal(`InvalidParameterValue; see the SQS docs.`)
    expect(queueNameHasSpaceErr.code).to.equal('InvalidParameterValue')
  })
})
