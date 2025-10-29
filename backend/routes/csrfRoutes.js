const express = require('express');
const router = express.Router();
const csrfController = require('../controller/csrfController');

// ⚠️ VULNERABLE ENDPOINTS (for educational purposes)
// Task 1: Basic CSRF - Money Transfer (no protection)
router.post('/transfer', csrfController.transfer);

// Task 2: Token Bypass - Weak CSRF validation
router.post('/token-bypass-transfer', csrfController.tokenBypassTransfer);

// Task 3: Email Change - No CSRF protection
router.post('/change-email', csrfController.changeEmail);

// Helper endpoint - Get valid CSRF token for testing
router.get('/get-token', csrfController.getToken);

// Task 5: JSON CSRF - Vulnerable to text/plain bypass
router.post('/json-update', csrfController.jsonUpdate);

// SECURE ENDPOINTS (for comparison/education)
router.post('/secure/transfer', csrfController.secureTransfer);
router.post('/secure/change-email', csrfController.secureChangeEmail);

module.exports = router;
