import mongoose from "mongoose";

const MONGODB_HOST = "localhost:27017";
const MONGODB_DATABASE = "dgwebsite";

//const { MONGODB_HOST, MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;
//const MONGODB_URI = `mongodb+srv://Chacky:959688671dD@cluster0.ajddt.mongodb.net/dgwebsite?retryWrites=true&w=majority`;

//mongodb+srv://Chacky:959688671dD@cluster0.ajddt.mongodb.net/dgwebsite?retryWrites=true&w=majority

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })

  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));
