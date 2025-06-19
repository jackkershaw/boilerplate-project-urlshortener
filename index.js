require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
  originalURL: String,
  shortURL: Number,
});

// Your first API endpoint
app.post("/api/shorturl", function (req, res) {
  res.json({ original_url: originalURL, short_url: shortURL });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
