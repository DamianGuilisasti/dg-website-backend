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

require("./config/database");

// Inicializations

const app = express();

// Settings

app.set("port", process.env.PORT || 4000);

async function start() {
  await initialSetup.createRoles();
  await initialSetup.createFirstUser();
  await initialSetup.initializeDatabase();
}

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

const server = app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
  console.log("Environment: ", process.env.NODE_ENV || "Producción");
});

start();

module.exports = { app, server };
