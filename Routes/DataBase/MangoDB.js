const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
async function getClientAndCollection() {
  try {
    await mongoose.connect(process.env.DB_CONNECT_DB);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
module.exports = {
  getClientAndCollection,
};