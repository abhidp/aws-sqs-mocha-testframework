import { expect } from 'chai'
import * as aws from '../config/aws.conf'
import { createQueueAndGetURL } from '../actions/createQueue';

describe('Tests for Creating a Message Queue', async () => {

  it('Should return a successful response for valid Queue creation Request', async () => {
    const queueURL = await createQueueAndGetURL('madmax')
    const expectedQueueURL = aws.endpoint + '/queue/madmax'

    expect(queueURL).to.equal(expectedQueueURL)
  })

  it('Should fail with Error Messages when QueueName is missing', async () => {
    const createQueueErr = await createQueueAndGetURL(undefined)
    expect(createQueueErr.message).to.equal(`Missing required key 'QueueName' in params`)
    expect(createQueueErr.code).to.equal('MissingRequiredParameter')

  })


})
