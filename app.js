
import Express from "express";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { bootstrap } from "./services/commonService.js";
import { createConnection } from "mysql2";
 import dotenv from 'dotenv';
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

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});

app.get("/healthz", (req, res) => {
  let health = false;
  var connection = createConnection({
     host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  // Connect to the MySQL server
  connection.connect((err) => {
    if (err) {
      health = false;
    } else {
      health = true;
    }
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (
      Object.keys(req.params).length > 0 ||
      Object.keys(req.query).length > 0
    ) {
      // If parameters are detected, respond with a 400 Bad Request status code
      res.status(400).send();
    }
    if (req.get("Content-Length") > 0) {
      res.status(400).send();
    }
    if (health) {
      res.send();
    } else {
      res.status(503).send();
    }
  });
});

app.all("/healthz", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.status(405).send();
});

bootstrap();

export default app;
