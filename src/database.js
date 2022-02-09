import mongoose from "mongoose";

const { MONGODB_URI_TEST, MONGODB_URI, NODE_ENV } = process.env;

const connectionString =
  NODE_ENV === "production" ? MONGODB_URI : MONGODB_URI_TEST;

mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })

  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));
