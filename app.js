
import Express from "express";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { bootstrap } from "./services/commonService.js";
import { createConnection } from "mysql2";



 import dotenv from 'dotenv';
import logger from "./logger.cjs";
import trackAPICalls from "./middleware/apiMetrics.js";
import { sendEmail } from "./scripts/mail-setting.js";
import { checkhealth } from "./middleware/healthcheck.js";

dotenv.config()
export const app = Express();
const PORT = 3000;

//-----------------------------------------------------------
app.use(Express.json());




app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,x-access-token"
  );
  next();
});

app.use(userRouter);
app.use(assignmentRoutes);
app.use(trackAPICalls);
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

app.get("/healthz", 
  checkhealth
);

app.patch("/v1/assignments/", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.status(405).send();
});

app.patch("/v1/assignments/:id", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.status(405).send();
});
// app.all("/healthz", (req, res) => {
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("X-Content-Type-Options", "nosniff");
//   res.status(405).send();
// });


bootstrap()



export default app;
