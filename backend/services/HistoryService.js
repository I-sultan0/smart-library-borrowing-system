import Borrow from "../models/Borrow.js";

export const getBorrowHistory = async (userId) => {
  return await Borrow.find({
    userId,
    status: "Returned",
  })
    .populate("bookId", "title author")
    .sort({
      createdAt: -1,
    });
};
