import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import useragent from "express-useragent";
import path from "path";
import cors from "cors";
import materialRoutes from "./routes/materialRoutes.js";
import autenticationRoutes from "./routes/authenticationRoutes.js"

import { db } from "./config/dbConfig.js";


// appRoot = __dirname;

dotenv.config();
const app = express();


app.use(useragent.express());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));
  
  
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    if (req.method === "OPTIONS") {
      res.header("ACCESS-CONTROL-ALLOW-METHODS", "PUT, POST, PATCH, GET, DELETE");
      return res.status(200).json({});
    }
    next();
  });

app.use("/infra/users", autenticationRoutes);
app.use("/infra/materials", materialRoutes);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



//server connection
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server connected to ${PORT}`);
});


