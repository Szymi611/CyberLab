const express = require('express');
const { vulnerableLogin, filteredLogin, blindLogin, unionBasedLogin, errorBasedLogin } = require('../controller/sqlInjectionController');
const router = express.Router();

router.post('/vulnerable-login', vulnerableLogin)
router.post('/filtered-login', filteredLogin)
router.post('/blind-login', blindLogin)
router.post('/union-based-login', unionBasedLogin)
router.post('/error-based-login', errorBasedLogin)

module.exports = router;