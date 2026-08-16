require('dotenv').config();
const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // JSON data parse karne ke liye
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const dbName = "portfolioDB";
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

// Home route
app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running!");
});

// GET all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await db.collection("projects").find().toArray();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST a new project
app.post("/api/projects", async (req, res) => {
  try {
    const result = await db.collection("projects").insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});