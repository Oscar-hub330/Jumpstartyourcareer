/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

const generateToken = (adminId) => {
  return jwt.sign(
    {
      id: adminId,
      role: "admin"
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export default generateToken;