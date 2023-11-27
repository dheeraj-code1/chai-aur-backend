import mongoose from "mongoose";  
import { DB_NAME } from "../constants.js";

/*
1. Connecting the db
2. Db on another continent 
3. have to use async and await 
4. using the trycatch, Error handling is done in better way 
5. exorting the connecteDB function 
*/
const connectDB = async function () {
  try {
    let connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
