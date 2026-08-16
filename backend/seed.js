require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedData() {
  try {
    await client.connect();
    const db = client.db("portfolioDB");

    const projects = [
      {
        title: "Portfolio Website",
        description: "A full-stack personal portfolio built with Node.js and MongoDB",
        link: "https://github.com/yourusername/portfolio"
      },
      {
        title: "To-Do App",
        description: "A simple task management app",
        link: "https://github.com/yourusername/todo-app"
      }
    ];

    const result = await db.collection("projects").insertMany(projects);
    console.log(`${result.insertedCount} projects added!`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

seedData();