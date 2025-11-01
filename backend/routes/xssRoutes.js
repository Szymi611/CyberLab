const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const xssController = require('../controller/xssController');

const xssVerifyLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 30, 
  message: { error: 'Too many verification attempts, please try again later.' }
});

const commentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: { error: 'Too many comments, please try again later.' }
});

router.post('/verify', xssVerifyLimiter, xssController.verifyXssPayload);
router.get('/comments', xssController.getComments);
router.post('/comments', commentLimiter, xssController.addComment);
router.delete('/comments', xssController.clearComments);

module.exports = router;
