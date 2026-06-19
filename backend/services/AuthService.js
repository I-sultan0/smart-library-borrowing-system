import User from "../models/User.js";

export const createUser = async (data) => {
  const { email } = data;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }
  return User.create(data);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordVerification = await user.comparePassword(password);
  if (!passwordVerification) {
    throw new Error("Invalid email or password");
  }
  user.password = undefined;
  return user;
};
