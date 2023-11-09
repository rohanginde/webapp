import { Assignment } from "../models/assignment.js";

import { User } from "../models/user.js";
import { parseCSV } from "../scripts/import-csv.js";
import bcrypt from "bcrypt";

export const bootstrap = async () => {
   await User.sync();
   
   await Assignment.sync()
    try {
      parseCSV((data) => {
        data.forEach(async (row) => {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw err;
            }
  
            bcrypt.hash(row.password, salt, (err, hash) => {
              if (err) {
                throw err;
              }
  
              // Store 'hash' in your database or use it as needed
  
              User.findOrCreate({
                where: { email: row.email },
                defaults: {
                  first_name: row.first_name,
                  last_name: row.last_name,
                  password: hash,
                },
              })
                .then((User) => {
                  console.log(`User created with ID: ${User.id}`);
                })
                .catch((error) => {
                  console.error("Error creating user:", error);
                });
                
            });
          });
        });
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
