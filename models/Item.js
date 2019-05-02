const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    register_date: {
        type: Date,
        default:Date.now,   
      },
      creator:{
          type: Schema.Types.ObjectId,
          ref: "user"
      }
})

module.exports = Item = mongoose.model("item", itemSchema);