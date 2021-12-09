const mongoose = require("mongoose")
const Schema = mongoose.Schema
const newsSchema = new Schema({
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
module.exports = mongoose.model("News", newsSchema)