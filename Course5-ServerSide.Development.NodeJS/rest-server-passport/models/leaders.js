// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var leaderSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    designation: {
      type: String
    },
    abbr: {
      type: String
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// the schema is useless so far, utterly worthless
// we need to create a model using it
var Leaders = mongoose.model("Leader", leaderSchema);

// make this available to our Node applications
module.exports = Leaders;
