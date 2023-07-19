const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// Endpoint for registeration
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Loads existing users
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  // Check if user already exists in file
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Add new user
  users.push({ username, password });
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  // Display message if successful
  res.json({ message: "User registered" });
});

// Endpoint for login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Load existing users
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

  // Checks for user and password match
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid usernam or password" });
  }

  res.json({ message: "Login successful" });
});

// Endpoint for saving game results
app.post("/results", (req, res) => {
  const { result } = req.body;

  // Load results
  const results = JSON.parse(fs.readFileSync("results.json", "utf8"));

  // Adds results from game session
  results.push({ result });
  fs.writeFileSync("results.json", JSON.stringify(results, null, 2));

  res.json({ message: "Results stored successfully" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
