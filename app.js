
import Express from "express";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { bootstrap } from "./services/commonService.js";
import { createConnection } from "mysql2";



 import dotenv from 'dotenv';
import logger from "./logger.cjs";
import trackAPICalls from "./middleware/apiMetrics.js";

import { checkhealth } from "./middleware/healthcheck.js";
import sequelize from "./config/database.js";

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

app.get("/healthz", async (req,res)=>{
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (Object.keys(req.params).length > 0 || Object.keys(req.query).length > 0) {
      // If parameters are detected, respond with a 400 Bad Request status code
      res.status(400).send();
    }
    if (req.get("Content-Length") > 0) {
      res.status(400).send();
    }
    try {
      await sequelize.authenticate();
        res.send();
    } catch (err) {
      res.status(503).send();
      console.log(err)
      return false;
    }
  }
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
