import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const options = {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  };

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, options);
};

export default generateToken;
