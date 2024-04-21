const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  password: String,
  role: Array,
  created_at: Date,
  updated_at: Date,
  messages: Array
});
const User = mongoose.model("User", userSchema);

module.exports = { User };