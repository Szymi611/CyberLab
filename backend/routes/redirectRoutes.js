const express = require('express');
const router = express.Router();
const redirectController = require('../controller/redirectController');


router.get('/basic', redirectController.basicRedirect);

router.get('/whitelist-bypass', redirectController.whitelistBypass);

router.get('/protocol-bypass', redirectController.protocolBypass);

router.get('/encoding-bypass', redirectController.encodingBypass);

router.get('/secure', redirectController.secureRedirect);

router.get('/test-url', redirectController.testUrl);

module.exports = router;