const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register function
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User ${username} already exists` });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hashSync(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: `User ${username} created successfully` });
  } catch (error) {
    console.error("Error in register:", error.message);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: `User ${username} not found` });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user's id and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and role to the client
    res.status(200).json({ 
      token, 
      role: user.role,  // Include the role in the response
      message: `Logged in as ${username}` 
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ message: "Server error " });
  }
};

module.exports = { register, login, logout };
