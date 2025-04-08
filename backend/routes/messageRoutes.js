const express = require('express');
const { sendMessage, allMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, sendMessage);     // Send message
router.get('/:chatId', protect, allMessages); // Get all messages in a chat

module.exports = router;
