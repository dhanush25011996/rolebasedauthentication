const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

// Only admin can access this route
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome admin" });
});

// Both admin and manager can access this route
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome manager" });
  }
);

// All users can access this route
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome user" });
  }
);

module.exports = router;
