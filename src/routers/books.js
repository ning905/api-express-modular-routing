const { request } = require("express");
const express = require("express");
const { books } = require("../../data.js");
const { updateObject } = require("../updateObject.js");

const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  res.json({ books });
});

bookRouter.post("/", (req, res) => {
  const newBook = { ...req.body, id: books[books.length - 1].id + 1 };
  const allFields =
    req.body.hasOwnProperty("title") &&
    req.body.hasOwnProperty("type") &&
    req.body.hasOwnProperty("author");
  const foundBook = books.find(
    (book) => book.title.toLocaleLowerCase() === req.body.title.toLowerCase()
  );

  if (!allFields) {
    return res
      .status(400)
      .json({ error: "Missing fields in the request body" });
  }

  if (foundBook) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  books.push(newBook);
  res.json({ book: newBook });
});

bookRouter.get("/:id", (req, res) => {
  const foundBook = books.find((book) => book.id === Number(req.params.id));

  if (!foundBook) {
    return res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  res.json({ book: foundBook });
});

bookRouter.delete("/:id", (req, res) => {
  const foundBook = books.find((book) => book.id === Number(req.params.id));

  if (!foundBook) {
    return res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  books.splice(books.indexOf(foundBook), 1);
  res.json({ book: foundBook });
});

bookRouter.put("/:id", (req, res) => {
  const foundBook = books.find((book) => book.id === Number(req.params.id));
  const foundTitle = books.find(
    (book) =>
      book.title.toLocaleLowerCase() === req.body.title.toLocaleLowerCase()
  );

  if (!foundBook) {
    return res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  if (foundTitle) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  const updatedBook = { ...req.body, id: Number(req.params.id) };
  books.splice(books.indexOf(foundBook), 1, updatedBook);
  res.json({ book: updatedBook });
});

bookRouter.patch("/:id", (req, res) => {
  const foundBook = books.find((book) => book.id === Number(req.params.id));
  const foundTitle = books.find(
    (book) =>
      book.title.toLocaleLowerCase() === req.body.title.toLocaleLowerCase()
  );

  if (!foundBook) {
    return res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  if (foundTitle) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  const updatedBook = updateObject(foundBook, req.body);
  books.splice(books.indexOf(foundBook), 1, updatedBook);
  res.json({ book: updatedBook });
});

module.exports = bookRouter;
