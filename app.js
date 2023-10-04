import express from "express";
import { createConnection } from "mysql2";
const app = express();
const port = 3000;


app.get("/healthz", (req, res) => {
  let health = false;
  var connection = createConnection({
    host: "localhost",
    user: "root",
    password: "root@123456",
    database: "sys",
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
    if (Object.keys(req.params).length > 0 || Object.keys(req.query).length > 0) {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
