// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });
/* 
1. importing the required files for connecting the db
2. Importing the dotenv for the maintaing the essential parameters
3. Calling function connectDB which basically return a promise
4. If promise is resolved then we are checking the working of express app 
5. Then we are listening at provided PORT
6. If promise is not resolved then throwing an error 
*/

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express is not working!!!", error);
      throw error;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running at PORT:", process.env.PORT);
      console.log();
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed!!!", error);
  });

/*
import  express  from 'express';
const app = express()

;( async()=> {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    app.on("error",(error)=>{
      console.log("ERROR:",error);
      throw error
    })
    
    app.listen(process.env.PORT,()=>{
      console.log(`App is listening on the ${process.env.PORT}`);
    })

  } catch (error) {
    console.error("ERROR:",error)
    throw error
  }
})()   */
