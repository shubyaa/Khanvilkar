const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const address = require("./address");

dotenv.config();

const db_string = process.env.mongo_uri;
mongoose.connect(db_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = 8080;

app.use(express.json());
app.use("/api/address", address);

app.listen(port, () => {
  console.log(`Server started at ${port}`);

  const database = mongoose.connection;

  database.once("connected", () => {
    console.log("Database connected");
  });

  database.on("error", () => {
    console.log("error");
  });
});
