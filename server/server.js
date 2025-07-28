const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require("./models/User");
const Problem = require("./models/Problem");
const DBConnection = require('./database/db');

dotenv.config();
DBConnection();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // React frontend
  credentials: true
}));

// Middleware for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Save user data to request
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Routes
app.get("/", (req, res) => {
  res.send("Hello World! from backend");
});

app.get("/api", (req, res) => {
  res.send("Connected to Express via Vite proxy!");
});

app.get("/home", (req, res) => {
  const { username } = req.query;
  res.send(`Welcome ${username || "Guest"} to the home page!`);
});

// Register route
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;

    if (!(firstname && lastname && email && username && password)) {
      return res.status(400).send("Please enter all the required info!");
    }

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return res.status(400).send("User already exists with the same email.");
    }
    if (existingUsername) {
      return res.status(400).send("User already exists with the same username.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: "You have successfully registered!",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username
      },
      token
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Server error");
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send("Please enter all the required info!");
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).send("Invalid username!");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password!");
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true, 
      secure: false,
      sameSite: "Lax",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: "You have successfully logged in!",
      username: existingUser.username,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
});

// Get all problems
app.get('/problems', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).send("Error fetching problems");
  }
});

// Get specific problem by ID
app.get('/api/problems/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).send("Error fetching problem");
  }
});

// Protected profile route
app.get('/profile',authenticateToken,  async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error("Error in /profile:", err);
    res.status(500).send("Server error");
  }
});

// Example endpoint: GET /api/leaderboard

app.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });
    res.json(users);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});



app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out" });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
