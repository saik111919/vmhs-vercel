const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { broadcastMessage } = require("./WebSocket/WebSocket");
const { User } = require("../Modal/model");
const saltRounds = 10;

// // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Issue JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log(token);
    res.status(201).json({ email: user.email, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "username and email fields or required",
        status: 400,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ name: username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: `${existingUser.name} User already exists` });
    }

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUserId = 1;
    const lastUser = await User.findOne({}, {}, { sort: { _id: -1 } });

    if (lastUser) {
      newUserId = lastUser._id + 1;
    }

    const newUser = new User({
      _id: newUserId,
      name: username,
      email: email,
      password: hashedPassword,
      created_at: new Date(),
      role: ["user"],
    });

    const savedUser = await newUser.save();

    res.status(200).send({
      user: savedUser.name,
      message: `${username} Registered Successfully.`,
      status: 200,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

const getAllWorkouts = (req, res) => {
  res.send("Get all workouts");
};

const sendMessage = (req, res) => {
  const { message } = req.body;

  // Broadcast message to all WebSocket clients
  broadcastMessage(message);

  res.status(200).json({
    success: true,
    message: "Message broadcasted to WebSocket clients.",
  });
};

module.exports = { getAllWorkouts, sendMessage, login, register };
