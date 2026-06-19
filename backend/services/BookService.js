import Book from "../models/Book.js";

export const getAllBooks = async () => {
  return await Book.find();
};

export const getBookById = async (id) => {
  const book = await Book.findById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};
