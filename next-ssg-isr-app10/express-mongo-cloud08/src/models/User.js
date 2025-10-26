import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// "User" → colección "users" (pluralización automática de Mongoose)
export default mongoose.model('User', userSchema);
