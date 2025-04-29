const express = require('express');
const router = express.Router();
const Question = require('../../../Server/models/ChatBotModel/Question'); // Adjust the path as necessary

router.post('/ask', async (req, res) => {
  const { query } = req.body;
  try {
    // Convert query to lowercase and split into words
    const queryWords = query.toLowerCase().split(' ');
    // Find questions with matching keywords
    const response = await Question.findOne({
      keywords: { $in: queryWords },
    });

    if (response) {
      res.json({ answer: response.answer });
    } else {
      res.json({ answer: "Sorry, I can only answer questions about parcel delivery. Please ask something related." });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;