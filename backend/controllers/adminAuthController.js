/* eslint-disable no-unused-vars */
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

/* ========= LOGIN ========= */
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ========= VERIFY ========= */
export const verifyAdmin = async (req, res) => {
  res.json({ success: true });
};