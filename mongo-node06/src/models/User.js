import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:      { type: String },
  lastName:  { type: String },
  email:     { type: String, unique: true },
  age:       { type: Number, min: 18, required: true },
  phoneNumber:{ type: String },
  password:  { type: String, minlength: 8, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
