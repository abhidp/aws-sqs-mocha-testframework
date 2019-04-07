/* var mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reporDir: 'test-reports',
    reportFilename: 'sqs-test-report',
    quiet: false
  }
}); */

//Create Order of Test Execution

import '../specs/queues/createQueue.spec'
import '../specs/messages/sendMessage.spec'
import '../specs/messages/receiveMessage.spec'
import '../specs/messages/deleteMessage.spec'