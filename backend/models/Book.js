import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  title: String,
  author: String,
  pricePerDay: Number,
  available: Boolean,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
