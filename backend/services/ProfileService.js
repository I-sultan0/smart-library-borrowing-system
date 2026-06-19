import User from "../models/User.js";
import Borrow from "../models/Borrow.js";

export const getProfileData = async (userId) => {
  const user = await User.findById(userId);

  const activeBorrows = await Borrow.countDocuments({
    userId,
    status: "Active",
  });

  const totalBorrows = await Borrow.countDocuments({
    userId,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    activeBorrows,
    totalBorrows,
  };
};
