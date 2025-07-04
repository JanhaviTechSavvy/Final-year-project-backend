const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User"); // ✅ Required for profile route

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected route to fetch user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      message: "Profile data",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Optional: Protect update/delete
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
