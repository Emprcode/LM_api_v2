import express from "express";
import {
  addBook,
  getAllBooks,
  getBookByIsbn,
  getBorrowedBooks,
} from "../model/book/BookModel.js";

const router = express.Router();

// add a book
router.post("/", async (req, res, next) => {
  try {
    const { isbn } = req.body;

    const bookExists = await getBookByIsbn({ isbn });

    if (bookExists?._id) {
      return res.json({ status: "error", message: "Book already exists!" });
    }

    const book = await addBook(req.body);
    if (book?._id) {
      return res.json({
        status: "success",
        message: "Book added successfully!",
      });
    }
    res.json({
      status: "error",
      message: "Unable to add book. Please try again later!",
    });
  } catch (error) {
    next(error);
  }
});

// get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await getAllBooks();
    if (books) {
      return res.status(200).json({
        status: "success",
        books,
      });
    }
    return;
  } catch (error) {
    next(error);
  }
});

// get books borrowed by specific user

router.get("/borrowedByUser", async (req, res, next) => {
  try {
    const result = await getBorrowedBooks(req.headers.authorization);
    if (result?._id) {
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
