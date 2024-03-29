const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// sign up

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);

    // Check if a user with the same email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email already exists:", email);
      return res.json({ message: "Email already exists" });
      // return res.status(400).json({ message: "Email already exists" });
    }

    // Check if a user with the same username exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      console.log("Username already exists:", username);
      return res.json({ message: "Username already exists" });
      // return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      email,
      username,
      password: hashPassword,
    });

    // Save the new user to the database
    await newUser.save()
    .then(() => res.status(200).json({ message: "New User Registered" }))
    // console.log("New user registered:", newUser);
    // Respond with the newly created user
    // res.status(200);
    console.log("New user registered:", newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// sign in
router.post("/signin", async (req, res) => {
  try {
    // Check if a user with the same email exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log("User not Found");
      return res.status(400).json({ message: "Sign Up First" });
    }

    // Check if a user with the same username exists
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return res.status(400).json({ message: "Incorrect password" });
    }

    const {password, ...others} = user._doc;
    res.status(200).json({others})
    console.log("User logged in successfully", user);

  } catch (error) {
    console.error("Error signing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
