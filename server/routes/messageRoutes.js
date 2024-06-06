const express = require("express");

const router = express.Router();

const { sendMessage, getMessages } = require("../controller/messageController.js");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, sendMessage);
router.get("/:chatId", authMiddleware, getMessages);

module.exports = router;