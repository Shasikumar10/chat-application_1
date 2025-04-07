const express = require("express");
const { sendMessage, allMessages } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);     // GET all messages for a chat
router.route("/").post(protect, sendMessage);           // POST a new message

module.exports = router;
