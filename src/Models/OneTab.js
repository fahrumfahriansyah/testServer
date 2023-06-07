const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    latitude:{
        type: "string",
        required: true,
    },
    longitude:{
        type: "string",
        required: true,
    },
    image: {
        type: "string",
        required: true,
    },
    cpus: {
      type: Array,
      required: true,
    },
    homedir: {
      type: String,
      required: true,
    },
    networkInterfaces: {
      type: Object,
      required: true,
    },
    tmpdir: {
      type: String,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("asd", DataSchema);