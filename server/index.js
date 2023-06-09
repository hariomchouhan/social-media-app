import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import { configureDb } from "./src/Config/DbConfig.js";
import AuthRoute from "./src/Router/AuthRoute.js";
import UserRoute from "./src/Router/UserRoute.js";
import PostRoute from "./src/Router/PostRoute.js";
import UploadRoute from "./src/Router/UploadRoute.js";

const app = express();

// to server images for public
app.use(express.static('public'))
app.use('/images', express.static("images"))

app.use(cors());
app.use(express.json());
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.listen(process.env.SERVER_PORT, () => {
  configureDb(),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
