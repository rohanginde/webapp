import { Buffer } from "buffer";
import bcrypt from "bcrypt";
import { findUserbyEmail } from "../services/userService.js";

//-----------------------------------------------------------
export async function validateToken(req, res, next) {
  const arr = getCredentials(req);
  if(arr==''){
    return res.status(401).json("Unauthorized");
  }

  const username = arr[0];
  const password = arr[1];
  const user = await findUserbyEmail(username);
  if (!user) {
    return res.status(401).json();
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return res.status(401).json();
  }

  return next();
}

export const getCredentials = (req) => {
  console.log(req.header("Authorization"));

  const token = req.header("Authorization");
  let arr = '';

 

  if (token == undefined) {
    return arr;
  } else {
    //decode the base64 to string
    const originalCred = Buffer.from(token.substring(6), "base64").toString(
      "utf-8"
    );
    arr = originalCred.split(":");
  }

  return arr;
};
