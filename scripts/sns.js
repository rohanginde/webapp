import dotenv from 'dotenv';

dotenv.config()

import AWS from 'aws-sdk';

// Configure AWS credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });

// Create an SNS object
const sns = new AWS.SNS();


export async function publishToSNS(message) {
    console.log("first")
    try {
      const params = {
        Message: JSON.stringify({
          default: 'initializing',
          email: message.email,
          http:message.submission_url,
          assignment_id:message.assignment_id,
          submission_id:message.submission_id,
        }),
        
        TopicArn: process.env.SNS, 
      };
      console.log(params.Message);
  
      const result = await sns.publish(params).promise();
      console.log('Message published to SNS:', result);
  
      return result;
    } catch (error) {
      console.error('Error publishing to SNS:', error);
      throw error;
    }
  }