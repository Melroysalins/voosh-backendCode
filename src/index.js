import dotenv from "dotenv";
import { app } from "./app.js";
import { ConnectDB } from "./DB/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 7000;

ConnectDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log("Connected to database at port !!", PORT);
    })
  )
  .catch((error) => {
    console.log("Failed to connect !!", error);
  });
