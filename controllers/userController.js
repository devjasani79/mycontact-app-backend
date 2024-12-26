const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("ALL FIELDS ARE MANDATORY");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("USER ALREADY REGISTERED");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    // Create JWT token for user
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Send the token in the response
    return res.status(201).json({
      accessToken,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create JWT token for user
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Respond with access token and user details
    return res.status(200).json({
      accessToken,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error("EMAIL OR PASSWORD IS NOT VALID");
  }
});

// Get Current User Info
const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id); // Ensure you’re fetching user by decoded ID
  if (user) {
    res.json({
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, loginUser, currentUser };
