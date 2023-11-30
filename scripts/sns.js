import dotenv from 'dotenv';

dotenv.config()

import AWS from 'aws-sdk';

// Configure AWS credentials
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     region: process.env.AWS_REGION,
//   });

const profileName = 'dev';


const credentials = new AWS.SharedIniFileCredentials({ profile: profileName });
AWS.config.credentials = credentials;

const sns = new AWS.SNS();


export async function publishToSNS(user) {


    
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