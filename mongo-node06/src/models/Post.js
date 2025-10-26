import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title:     { type: String, minlength: 5, maxlength: 30, required: true },
  content:   { type: String, minlength: 10, required: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hashtags:  [{ type: String }],
  imageUrl:  { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

export default mongoose.model("Post", postSchema);
