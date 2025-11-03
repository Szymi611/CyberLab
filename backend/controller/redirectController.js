const WEAK_WHITELIST = ["localhost:3000", "cyberlab.com", "trusted-site.com"];

function isInWeakWhitelist(url) {
  try {
    const urlObj = new URL(url);
    const host = urlObj.host;
    
    return WEAK_WHITELIST.some(allowed => host.includes(allowed));
  } catch {
    return false;
  }
}

// Helper: Secure whitelist check (for comparison/teaching)
function isInSecureWhitelist(url) {
  try {
    const urlObj = new URL(url);
    const host = urlObj.host;
    
    // SECURE: Exact match, no substrings
    return WEAK_WHITELIST.includes(host);
  } catch {
    return false;
  }
}

// Task 1: Basic Open Redirect - NO VALIDATION (most vulnerable)
exports.basicRedirect = (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ 
        error: 'Missing url parameter',
        hint: 'Try: /api/redirects/basic?url=https://example.com'
      });
    }

    // VULNERABLE: Direct redirect without any validation
    console.log(`[VULNERABLE] Basic redirect to: ${url}`);
    
    // Return redirect URL for frontend to handle
    return res.json({ 
      success: true,
      redirectUrl: url,
      message: 'Redirecting...',
      vulnerability: 'No validation - accepts ANY URL'
    });
  } catch (err) {
    console.error('Error in basicRedirect:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Task 2: Whitelist Bypass - WEAK VALIDATION (bypassable)
exports.whitelistBypass = (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    // VULNERABLE: Weak whitelist check (substring matching)
    if (isInWeakWhitelist(url)) {
      console.log(`[WEAK-VALIDATION] Whitelist bypass redirect to: ${url}`);
      return res.json({ 
        success: true,
        redirectUrl: url,
        message: 'Redirecting to whitelisted domain',
        vulnerability: 'Substring matching can be bypassed (e.g., evil.com?cyberlab.com)'
      });
    } else {
      return res.status(403).json({ 
        error: 'URL not in whitelist',
        hint: 'Whitelist includes: localhost:3000, cyberlab.com, trusted-site.com'
      });
    }
  } catch (err) {
    console.error('Error in whitelistBypass:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Task 3: Protocol Check - WEAK VALIDATION (can be bypassed with // or javascript:)
exports.protocolBypass = (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    // VULNERABLE: Only blocks http:// and https:// but misses // and javascript:
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return res.status(403).json({ 
        error: 'Absolute URLs not allowed',
        hint: 'Try relative paths or other protocols'
      });
    }

    console.log(`[WEAK-PROTOCOL] Protocol bypass redirect to: ${url}`);
    return res.json({ 
      success: true,
      redirectUrl: url,
      message: 'Redirecting to relative path',
      vulnerability: 'Misses // (protocol-relative) and javascript: URLs'
    });
  } catch (err) {
    console.error('Error in protocolBypass:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Task 4: Encoding Bypass - WEAK VALIDATION (doesn't decode before check)
exports.encodingBypass = (req, res) => {
  try {
    let { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    // VULNERABLE: Checks raw URL before decoding
    if (url.includes('http://') || url.includes('https://')) {
      return res.status(403).json({ 
        error: 'External URLs blocked',
        hint: 'Try URL encoding'
      });
    }

    // Decode after check (VULNERABILITY!)
    url = decodeURIComponent(url);

    console.log(`[ENCODING-BYPASS] Redirect to decoded: ${url}`);
    return res.json({ 
      success: true,
      redirectUrl: url,
      message: 'Redirecting after decode',
      vulnerability: 'Validates before decoding - use %68%74%74%70 for http'
    });
  } catch (err) {
    console.error('Error in encodingBypass:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// SECURE ENDPOINT (for comparison/teaching)
exports.secureRedirect = (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    const decodedUrl = decodeURIComponent(url);

    if (isInSecureWhitelist(decodedUrl)) {
      console.log(`[SECURE] Allowed redirect to: ${decodedUrl}`);
      return res.json({ 
        success: true,
        redirectUrl: decodedUrl,
        message: 'Secure redirect',
        protection: 'Exact whitelist match + decode before validation'
      });
    } else {
      return res.status(403).json({ 
        error: 'URL not allowed',
        allowed: WEAK_WHITELIST
      });
    }
  } catch (err) {
    console.error('Error in secureRedirect:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.testUrl = (req, res) => {
  try {
    const { url, method } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    const results = {
      url: url,
      decoded: decodeURIComponent(url),
      tests: {
        basicRedirect: true,
        weakWhitelist: isInWeakWhitelist(url),
        secureWhitelist: isInSecureWhitelist(url),
        hasProtocol: /^https?:\/\//.test(url),
        isRelative: !url.includes('://'),
        isProtocolRelative: url.startsWith('//'),
        isJavascript: url.toLowerCase().startsWith('javascript:'),
        isData: url.toLowerCase().startsWith('data:')
      }
    };

    return res.json(results);
  } catch (err) {
    console.error('Error in testUrl:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};