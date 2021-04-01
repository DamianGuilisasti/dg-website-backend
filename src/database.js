import mongoose from "mongoose";

const MONGODB_HOST = "localhost:27017";
const MONGODB_DATABASE = "dgwebsite";

//const { MONGODB_HOST, MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })

  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));
