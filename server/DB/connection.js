const mongoose = require("mongoose");
require('dotenv').config();


const DB = process.env.DATABASE;

const conn = async (req, res) => {
  try {
    await mongoose.connect(DB).then(() => {
      console.log("Connected to DB");
    });
  } catch (error) {
    console.log(error);
  }
};

conn();
