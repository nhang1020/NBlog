"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var initWebRoutes = require("./routes/api");
var connectDB = require('./config/connectDB');
var cookie = require('cookie-parser');
// import express from 'express';
// import bodyParser from 'body-parser';
// import initWebRoutes from "./routes/api.js";
// import connectDB from './config/connectDB.js';
// import cookie from 'cookie-parser';

require('dotenv').config();
var app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cookie());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
initWebRoutes(app);
connectDB(app);
var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("NodeJS is runing at port: " + port);
});