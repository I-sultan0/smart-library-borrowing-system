import mongoose, { Schema } from "mongoose";

const borrowSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book is required"],
    },

    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    totalCost: {
      type: Number,
      min: [0, "Cost cannot be negative"],
    },

    status: {
      type: String,
      enum: ["Active", "Returned"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

const Borrow = mongoose.model("Borrow", borrowSchema);

export default Borrow;
