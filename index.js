require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dns = require("dns");

const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

let Url = mongoose.model("Url", urlSchema);

const createURL = async (urlData) => {
  try {
    const shorturl = new Url(urlData);
    await shorturl.save();
    console.log("Url created:", Url);
  } catch (err) {
    console.error("Error creating user:", err.message);
  }
};

// Your first API endpoint
app.post(
  "/api/shorturl",
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    let originalURL = req.body["url"];
    const myURL = new URL(originalURL);

    dns.lookup(myURL.hostname, async (err) => {
      if (err) {
        res.json({ error: "invalid url" });
        return;
      } else {
        const count = await Url.countDocuments();
        let shortURL = count + 1;
        await createURL({
          originalURL: originalURL,
          shortURL: shortURL,
        });
        res.json({ original_url: originalURL, short_url: shortURL });
      }
    });
  }
);

app.get("/api/shorturl/:input", async (req, res) => {
  const input = req.params.input;
  try {
    const result = await Url.findOne({ shortURL: input });
    if (!result) {
      return res.json({ error: "URL not found" });
    }
    res.redirect(result.originalURL);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
