import dotenv from 'dotenv';

dotenv.config()

import AWS from 'aws-sdk';

AWS.config.update({

    region: "us-east-1",
 });




const sns = new AWS.SNS();


export async function publishToSNS(user) {


    console.log(user)
    try {
      const SNSMessageParams = {
        Message: JSON.stringify({
            default: 'User submitted the assignment',
            submissionId:user.submissionId,
            submissionURL: user.submissionURL,
            assignmentId: user.assignmentId,
            username:user.email
        }),
        TopicArn: process.env.SNS
    };

    sns.publish(SNSMessageParams, (err, data) => {
          if (err) {
           console.log(err)
          } else {
              console.log(`Message ${SNSMessageParams.Message} sent to the topic ${SNSMessageParams.TopicArn}`);
              console.log("MessageID is " + data.MessageId);
              
          }
      });
     
    } catch (error) {
      console.error('Error publishing to SNS:', error);
      throw error;
    }
  }