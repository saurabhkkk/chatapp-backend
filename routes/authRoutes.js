const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

//

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user", authMiddleware, authController.getUser);

module.exports = router;
