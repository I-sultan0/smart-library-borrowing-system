import { getAllBooks, getBookById } from "../services/BookService.js";

export const getBooksCtrl = async (req, res) => {
  try {
    const books = await getAllBooks();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBookCtrl = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
