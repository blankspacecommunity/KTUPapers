const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();

// MongoDB connection
mongoose.connect(
    "mongodb+srv://abinjojo2025:abinjojo123@cluster0.n0jvbwj.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser : true,
      useUnifiedTopology : true,
    });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define schema for your data
const Schema = mongoose.Schema;
const QuestionPaper = new Schema({
  createdAt : Date,
  courseCode : String,
  semester : Number,
  year : Date,
  questionLink : String,
  answerLink : String,
  courseName : String,
});

// Create a model based on the schema
const YourModel = mongoose.model("YourModel", QuestionPaper);

// Middleware
app.use(bodyParser.json());

// GET request route
app.get("/papers", async (req, res) => {
  try {
    const data = await YourModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({message : error.message});
  }
});

// POST request route
app.post("/papers", async (req, res) => {
  const newData = new YourModel(req.body);
  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({message : error.message});
  }
});

// Start the server
const PORT = 3000; // You can set your desired port
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
