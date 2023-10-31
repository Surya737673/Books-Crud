const express = require("express");
const app = express();
const cors = require("cors");
const connectDatabase = require("./db");
const Book = require("./Model/Book"); // Assuming you have defined the book schema

require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

connectDatabase();

// Create a book
app.post("/books", async (req, res) => {
  try {
    const { title, author, genre, publishedDate, description } = req.body;

    const book = await Book.create({ title, author, genre, publishedDate, description });

    res.status(201).json({
      success: true,
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

// Update a book
app.put("/books/:id", async (req, res) => {
  try {
    const { title, author, genre, publishedDate, description } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, { title, author, genre, publishedDate, description }, { new: true });

    res.status(200).json({
      success: true,
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

app.get("/", (req,res)=>{
  res.status(200).json({
    success: true,
    message:"Api is working"
  });
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
