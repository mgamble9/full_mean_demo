const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/full_mean_demo_july_2017")

const models_path = path.join(__dirname, "./../models")

fs.readdirSync(models_path).forEach(file => {
  if(file.toLowerCase().includes(".js")){
    require(path.join(models_path, file))
  }
})
