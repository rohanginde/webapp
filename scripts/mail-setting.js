// import mailgun from "mailgun-js";
// import dotenv from 'dotenv';
// import { DatabaseError } from "sequelize";
// dotenv.config()
// // Initialize the Mailgun client
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: "dev.rohanswebapp.me",
// });

// // Compose and send an email
// const data = {
//   from: "support@dev.rohanswebapp.me",
//   to: "ginde.r@northeastern.edu",
//   subject: `Message from Rohan's Web App`,
//   text: "Hello, this is the email body!",
// };

// export const sendEmail =(message) =>{ 
    
//     data.text=message
//     mg.messages().send(data, (error, body) => {
//   if (error) {
//     console.error("Email sending failed:", error);
//   } else {
//     console.log("Email sent successfully:", body);
//   }
// });
// }