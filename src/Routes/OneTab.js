const express = require('express')
const route = express.Router()
const OneTab=require("../Controllers/OneTab")

route.post("/unyl",OneTab.Create)


module.exports = route