import {
  borrowBook,
  getBorrowSummary,
  returnBook,
} from "../services/BorrowService.js";

export const borrowCtrl = async (req, res) => {
  try {
    const { bookId } = req.body;

    const borrow = await borrowBook(req.user._id, bookId);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const returnCtrl = async (req, res) => {
  try {
    const borrow = await returnBook(req.params.borrowId);

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const borrowSummaryCtrl = async (req, res) => {
  try {
    const summary = await getBorrowSummary(req.params.borrowId);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
