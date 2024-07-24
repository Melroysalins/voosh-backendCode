import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://66a108f91f4d28364e695be8--tranquil-cat-219a45.netlify.app",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

import { router } from "./Routes/user.route.js";

app.use("/api", router);

export { app };
