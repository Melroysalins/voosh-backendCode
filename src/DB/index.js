import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
  } catch (error) {
    console.log(process.env.MONGODB_URL);
    console.log("Failed to connect to Database----> ", error);
  }
};

export { ConnectDB };
