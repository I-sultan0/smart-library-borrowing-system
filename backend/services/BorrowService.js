import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";

export const borrowBook = async (userId, bookId) => {
  const activeBorrow = await Borrow.findOne({
    userId,
    status: "Active",
  });

  if (activeBorrow) {
    throw new Error("You already have an active borrowed book");
  }

  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (!book.available) {
    throw new Error("Book is currently unavailable");
  }

  const dueDate = new Date();

  dueDate.setDate(dueDate.getDate() + 7);

  const borrow = await Borrow.create({
    userId,
    bookId,
    borrowDate: new Date(),
    dueDate,
  });

  book.available = false;

  await book.save();

  return borrow;
};

export const returnBook = async (borrowId) => {
  const borrow = await Borrow.findById(borrowId);

  if (!borrow) {
    throw new Error("Borrow record not found");
  }

  if (borrow.status === "Returned") {
    throw new Error("Book already returned");
  }

  const book = await Book.findById(borrow.bookId);

  const returnDate = new Date();

  const borrowedDays = Math.max(
    1,
    Math.ceil((returnDate - borrow.borrowDate) / (1000 * 60 * 60 * 24)),
  );

  const totalCost = borrowedDays * book.pricePerDay;

  borrow.status = "Returned";

  borrow.returnDate = returnDate;

  borrow.totalCost = totalCost;

  book.available = true;

  await book.save();

  await borrow.save();

  return borrow;
};

export const getBorrowSummary = async (borrowId) => {
  const borrow = await Borrow.findById(borrowId);

  if (!borrow) {
    throw new Error("Borrow record not found");
  }

  const book = await Book.findById(borrow.bookId);

  const returnDate = new Date();

  const borrowedDays = Math.max(
    1,
    Math.ceil((returnDate - borrow.borrowDate) / (1000 * 60 * 60 * 24)),
  );

  const totalCost = borrowedDays * book.pricePerDay;

  return {
    borrowId: borrow._id,
    bookTitle: book.title,
    borrowDate: borrow.borrowDate,
    returnDate,
    borrowedDays,
    totalCost,
  };
};
