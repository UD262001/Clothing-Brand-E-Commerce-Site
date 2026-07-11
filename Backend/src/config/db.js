import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";

const connectToDB = async () => {
  await mongoose.connect(serverConfig.MONGO_URI)
  console.log('Database Connected');
  
};

export default connectToDB;
