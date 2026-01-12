import express from "express";
import Book from "./Book.js";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bookRouter = express.Router();
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

let books = [
  new Book(1, "Dune", "sf", "Frank Herbert"),
  new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
  new Book(3, "Foundation", "sf", "Asimov"),
];

bookRouter
  .route("/books")
  .get((req, res) => {
    let filteredBooks = {};
    if (req.query.genre) {
      filteredBooks = books.filter((x) => x.genre === req.query.genre);
    } else {
      filteredBooks = books;
    }
    res.json(filteredBooks);
  })

  .post((req, res) => {
    const { id, name, genre, author } = req.query;

    if (!id || !name || !genre || !author) {
      return res.status(400).json({ error: "All fields required" });
    }

    const bookId = Number(id);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Id must be a number" });
    }

    const newBook = new Book(bookId, name, genre, author);
    books.push(newBook);
    console.log(books);
    return res.json(newBook);
  });

bookRouter
  .route("/books/:bookId")
  .put((req, res) => {
    let bookModif = books.find((x) => x.id === Number(req.params.bookId));

    if (!bookModif) {
      return res.status(404).json({ error: "Book not found" });
    }

    bookModif.name = req.body.name;
    bookModif.genre = req.body.genre;
    bookModif.author = req.body.author;
    return res.json(bookModif);
  })

  .delete((req, res) => {
    const bookId = Number(req.params.bookId);

    const index = books.findIndex((x) => x.id === bookId);

    if (index === -1) {
      return res.status(404).json({ error: "Invalid index" });
    }

    const deletedBook = books.splice(index, 1)[0];

    return res.json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  });
