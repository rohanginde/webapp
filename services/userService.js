import { User } from "../models/user.js";



export const findUserbyEmail = async (email) => {

  const user = await User.findOne({ where: { email } });
  
  return user
};


