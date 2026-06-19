import express from "express";

import { getBooksCtrl, getBookCtrl } from "../controllers/BookController.js";

const router = express.Router();

router.get("/", getBooksCtrl);

router.get("/:id", getBookCtrl);

export default router;
