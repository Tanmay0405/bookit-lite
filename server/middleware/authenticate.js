const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ 1. Check header exists
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // ✅ 2. Check format
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = parts[1];

    // ✅ 3. Verify token
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ 4. Find user
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      return res.status(401).json({ error: "User not found" });
    }

    // ✅ 5. Attach to request
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = Authenticate;