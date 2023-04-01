import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import middleware from "i18next-http-middleware";
import i18next from "./modules/i18next";
import {
  HOST,
  DBPORT,
  DB
} from "./config/db.config";
import Seed from "./seeds/Seed";
import {
  authRoutes,
  userRoutes,
  profileRoutes,
  emailRoutes,
  imageRoutes,
} from "./routes/index";
import mongoose from "./models";

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(middleware.handle(i18next));

mongoose
  .connect(`mongodb://${HOST}:${DBPORT}/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

authRoutes(app);
userRoutes(app);
profileRoutes(app);
emailRoutes(app);
imageRoutes(app);

function initial() {
  Seed();
}

export default app;
