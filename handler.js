'use strict';

var AWS = require('aws-sdk');
var sqs = new AWS.SQS({
   region: 'us-east-1'
});

module.exports.temperature = function(event, context, callback) {

 var queueUrl = 'https://sqs.us-east-1.amazonaws.com/385311166785/myQueue';

 // response and status of HTTP endpoint
 var responseBody = {
     message: ''
 };
 var responseCode = 200;

 // SQS message parameters
 var params = {
     MessageBody: event.body,
     QueueUrl: queueUrl
 };

 sqs.sendMessage(params, function(err, data) {
     if (err) {
         console.log('error:', "failed to send message" + err);
         var responseCode = 500;
     } else {
         console.log('data:', data.MessageId);
         responseBody.message = 'Sent to ' + queueUrl;
         responseBody.messageId = data.MessageId;
     }
     var response = {
         statusCode: responseCode,
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(responseBody)
     };

     callback(null, response);
 });

}