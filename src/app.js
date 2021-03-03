// Imports

import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
import initialSetup from "./libs/initialSetup";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Database Connection

require("./database");

// Inicializations

const app = express();

initialSetup.createRoles();
initialSetup.createFirstUser();

// Settings

app.set("port", process.env.PORT || 3000);

// Middlewares

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes

app.use("/api", router);

// Static Files

app.use(express.static(__dirname + "/public"));

// Start the Server

app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
  console.log("Environment: ", process.env.NODE_ENV);
});
