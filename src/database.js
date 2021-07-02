import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

function databaseUri() {
  if (process.env.NODE_ENV == "production") return process.env.MONGODB_URI;
  else
    return `mongodb://${process.env.MONGODB_HOST}${process.env.MONGODB_DATABASE}`;
}

mongoose
  .connect(databaseUri(), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })

  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));
