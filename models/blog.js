const mongoose = require("mongoose")
const Schema = mongoose.Schema
const blogSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  imgtexturl: {
    type: String
  }
},
{ timestamps: true }
)
module.exports = mongoose.model("Blog", blogSchema)