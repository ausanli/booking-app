const express = require("express");
//cors is a library which adds headers to each response. Headers are needed for browser security.
const cors = require("cors");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();

const bcryptSalt = bcryptjs.genSaltSync(8);
const jwtSecret = "lsjflskhdfkhjsfdoeiwrhj";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
//configure express to use cors
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

mongoose.connect(process.env.MONGO_URL);

const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      resolve(userData);
    });
  });
};

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcryptjs.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passwordCorrect = bcryptjs.compareSync(password, userDoc.password);
    if (passwordCorrect) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Wrong password");
    }
  } else {
    res.status(404).json("Not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, cookieData) => {
      if (error) throw error;
      const { name, email, _id } = await User.findById(cookieData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  try {
    await download.image({
      url: link,
      dest: __dirname + "/uploads/" + newName, // will be saved to /path/to/uploads/image.jpg
    });
    res.json(newName);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 12), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname: originalName } = req.files[i];
    const parts = originalName.split(".");
    const extention = parts[parts.length - 1];
    const newPath = path + "." + extention;
    fs.renameSync(path, newPath);
    const newPathWithoutUploads = newPath.replace("uploads\\", "");
    const newPathWithoutSlash = newPathWithoutUploads.replace(path.sep);
    console.log(newPathWithoutSlash);
    uploadedFiles.push(newPathWithoutSlash);
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    country,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkin,
    checkout,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;

    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      country,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkin,
      checkout,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    });
  } else {
    res.json(null);
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    country,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkin,
    checkout,
    maxGuests,
    price,
  } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          country,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkin,
          checkout,
          maxGuests,
          price,
        });
        await placeDoc.save();
        res.json("updated");
      }
    });
  } else {
    res.json(null);
  }
});

app.get("/places", async (req, res) => {
  const { minPrice, maxPrice, country } = req.query;
  const regex = new RegExp(country, "i");
  let filter = {};
  if (minPrice) {
    filter.price = { $gte: minPrice };
  }
  if (maxPrice) {
    filter.price = { ...filter.price, $lte: maxPrice };
  }
  if (country) {
    filter.country = regex;
  }
  const places = await Place.find(filter);
  res.json(places);
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const regex = new RegExp(q, "i");
    const places = await Place.find({ title: regex });
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {
    placeId,
    checkin,
    checkout,
    numberOfGuests,
    name,
    email,
    phone,
    price,
  } = req.body;

  try {
    const bookingDoc = await Booking.create({
      placeId,
      user: userData.id,
      checkin,
      checkout,
      numberOfGuests,
      name,
      email,
      phone,
      price,
    });
    res.json(bookingDoc);
  } catch (error) {
    res.json(error);
  }
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("placeId"));
});

app.listen(4000);
