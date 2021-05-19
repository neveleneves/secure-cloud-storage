const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorageProfilesSchema = new Schema({
  name: { type: String, required: true, unique: true },
  parent_dir: { type: String, required: true, unique: false },
  size: { type: Number, required: false, unique: false },
  path: { type: String, required: true, unique: false },
  type: { type: String, required: true, unique: false },
  unique_name: { type: String, required: false, unique: true },
});

module.exports = mongoose.model("storage-profiles", StorageProfilesSchema);
