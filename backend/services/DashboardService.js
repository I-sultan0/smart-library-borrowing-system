import Borrow from "../models/Borrow.js";

export const getDashboardData = async (userId) => {
  const activeBorrow = await Borrow.findOne({
    userId,
    status: "Active",
  }).populate("bookId");

  const historyCount = await Borrow.countDocuments({
    userId,
  });

  return {
    borrowId: activeBorrow?._id || null,

    activeBook: activeBorrow?.bookId?.title || "No Active Book",

    dueDate: activeBorrow?.dueDate || null,

    amountDue: activeBorrow?.totalCost || 0,

    historyCount,
  };
};
