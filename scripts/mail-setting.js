import mailgun from "mailgun-js";
import dotenv from 'dotenv';
import { DatabaseError } from "sequelize";
dotenv.config()
// Initialize the Mailgun client
const mg = mailgun({
  apiKey: "9d7bbab9fe6615b474e135d6c4b386a2-30b58138-44d2f805",
  domain: "dev.rohanswebapp.me",
});

// Compose and send an email
const data = {
  from: "support@dev.rohanswebapp.me",
  to: "ginde.r@northeastern.edu",
  subject: `Message from Rohan's Web App`,
  text: "Hello, this is the email body!",
};

export const sendEmail =(message) =>{ 
    
    data.text=message
    mg.messages().send(data, (error, body) => {
  if (error) {
    console.error("Email sending failed:", error);
  } else {
    console.log("Email sent successfully:", body);
  }
});
}

sendEmail("hello")