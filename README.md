# aws-sqs-mocha-testframework

End-to-End Tests for AWS-SQS written in JavaScript ES6 using Mocha test framework and Chai assertion library.
Tests are created against an Amazon SQS-compatible mock-server called [ElasticMQ](https://github.com/softwaremill/elasticmq)

>Note: The framework has not been tested against real AWS-SQS Cloud Service. Minor modifications in configuration are needed for tests to run against the real Service.


#### Pre-Reqs:

* Node
* Npm or Yarn
* Java
* ElasticMQ

#### Get Started:
* One-liner clone and install -
```
git clone https://github.com/abhimassive/aws-sqs-mocha-testframework.git && 
cd aws-sqs-mocha-testframework && 
yarn install
```

* Create a `.env` file at the root of the directory and populate values taking `.env_sample` as a reference
  
* Start ElasticMQ server (refer their repo link above)

* Run TestSuite -  `yarn run apitests`

* View Test Report - open `sqs-test-report.html` present under `test-reports` folder

![](https://i.imgur.com/c1PwqH1.gif)

