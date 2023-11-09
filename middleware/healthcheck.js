import { createConnection } from "mysql2";
import dotenv from "dotenv";
import { loggers } from "winston";
import logger from "../logger.cjs";

dotenv.config();
export const checkhealth = (req, res, next) => {
  let connection = createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  // Connect to the MySQL server
  connection.connect((err) => {
    console.log("called connection");
    let health = false;
    if (err) {
      health = false;
      console.log("Connection Failed");
      res.status(503).json("error");
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
      logger.info("Connection Success");

      console.log("Connection success");
      if (req.originalUrl == "/healthz") {
        res.send();
      } else {
        next();
      }
    } else {
      console.log("Connection Failed");
      res.status(503).send();
    }
  });
};
