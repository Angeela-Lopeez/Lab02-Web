import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("⚠️ El admin ya existe");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin123#", 10);

    const admin = new User({
      name: "Administrador",
      lastName: "Principal",
      email: "admin@example.com",
      password: hashedPassword,
      phoneNumber: "999999999",
      birthdate: new Date("1990-01-01"),
      role: "admin",
      address: "Oficina Central",
      url_profile: "https://via.placeholder.com/150"
    });

    await admin.save();
    console.log("✅ Usuario admin creado correctamente");
    process.exit();
  } catch (error) {
    console.error("Error creando admin:", error);
    process.exit(1);
  }
};

seedAdmin();
