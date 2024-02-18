const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    title: { type: String, required: true, validate: isString },
    artist: { type: String, required: true, validate: isString },
    album: { type: String, required: true, validate: isString },
    genre: { type: String, required: true, validate: isString },
  },
  {
    timestamps: true,
  }
);

// Custom validation function to check if the input is a string
function isString(value) {
  return typeof value === 'string';
}

module.exports = mongoose.model("Song", SongSchema);
