const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user", default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  contact: { type: Number, default: null },
  address: { type: String, default: null },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
});
module.exports = new mongoose.model("customer", customerSchema);
