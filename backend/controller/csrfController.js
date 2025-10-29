// CSRF Controller - Vulnerable endpoints for educational purposes
// NEVER USE THIS CODE IN PRODUCTION!

const csrfController = {
  transfer: (req, res) => {
    const { recipient, amount } = req.body;
    
    if (!recipient || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: recipient and amount"
      });
    }

    return res.json({
      success: true,
      message: `Transfer successful! $${amount} sent to ${recipient}`,
      details: {
        from: "victim@bank.com",
        to: recipient,
        amount: amount,
        timestamp: new Date().toISOString(),
        transactionId: Math.random().toString(36).substr(2, 9)
      }
    });
  },

  tokenBypassTransfer: (req, res) => {
    const { recipient, amount, csrf_token } = req.body;
    
    const VALID_TOKEN = "csrf_token_abc123xyz";

    if (!recipient || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters"
      });
    }

    if (csrf_token !== undefined && csrf_token !== "" && csrf_token !== null && csrf_token !== "null") {
      if (csrf_token !== VALID_TOKEN) {
        return res.status(403).json({
          success: false,
          message: "Invalid CSRF token"
        });
      }
    }

    return res.json({
      success: true,
      message: `CSRF token bypass successful! Transfer of $${amount} to ${recipient} completed.`,
      details: {
        from: "victim@bank.com",
        to: recipient,
        amount: amount,
        tokenProvided: csrf_token || "none",
        bypassMethod: !csrf_token || csrf_token === "" ? "empty/missing" : "null"
      }
    });
  },

  changeEmail: (req, res) => {
    const { newEmail } = req.body;
    
    if (!newEmail) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: newEmail"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }
    
    return res.json({
      success: true,
      message: `Email successfully changed from victim@example.com to ${newEmail}`,
      details: {
        oldEmail: "victim@example.com",
        newEmail: newEmail,
        username: "john_doe",
        timestamp: new Date().toISOString(),
        warning: "Attacker can now use 'Forgot Password' to take over this account!"
      }
    });
  },

  getToken: (req, res) => {
    const token = "csrf_token_abc123xyz";
    res.json({
      token: token,
      message: "Use this token for Task 2 testing"
    });
  },

  secureTransfer: (req, res) => {
    const { recipient, amount, csrf_token } = req.body;
    const validToken = req.session?.csrfToken; 

    if (!csrf_token) {
      return res.status(403).json({
        success: false,
        message: "CSRF token is required",
        error: "MISSING_CSRF_TOKEN"
      });
    }

    if (csrf_token !== validToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid CSRF token",
        error: "INVALID_CSRF_TOKEN"
      });
    }

    if (!recipient || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters"
      });
    }

    if (parseFloat(amount) > 10000) {
      return res.status(400).json({
        success: false,
        message: "Transfer amount exceeds daily limit. Please re-authenticate.",
        requiresReauth: true
      });
    }

    return res.json({
      success: true,
      message: `Secure transfer of $${amount} to ${recipient} completed`,
      details: {
        transactionId: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      }
    });
  },

  secureChangeEmail: (req, res) => {
    const { newEmail, password, csrf_token } = req.body;
    const validToken = req.session?.csrfToken;

    if (!csrf_token || csrf_token !== validToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid or missing CSRF token"
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Current password is required to change email"
      });
    }

    if (!newEmail) {
      return res.status(400).json({
        success: false,
        message: "New email is required"
      });
    }

    return res.json({
      success: true,
      message: "Verification email sent to new address",
      details: {
        newEmail: newEmail,
        status: "pending_verification",
        expiresIn: "24 hours"
      }
    });
  },

  jsonUpdate: (req, res) => {
    
    let data;
    
    if (typeof req.body === 'object' && !Array.isArray(req.body)) {
      data = req.body;
    } else if (typeof req.body === 'string') {
      try {
        data = JSON.parse(req.body);
      } catch (e) {
        const jsonMatch = req.body.match(/\{[^}]+\}/);
        if (jsonMatch) {
          try {
            data = JSON.parse(jsonMatch[0]);
          } catch (e2) {
            return res.status(400).json({
              success: false,
              message: "Invalid JSON format"
            });
          }
        }
      }
    }

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No data provided"
      });
    }

    const { email, role, notifications } = data;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    return res.json({
      success: true,
      message: `Profile updated successfully!`,
      details: {
        oldEmail: "user@example.com",
        newEmail: email,
        oldRole: "user",
        newRole: role || "user",
        notifications: notifications !== undefined ? notifications : true,
        timestamp: new Date().toISOString(),
        warning: role === "admin" ? "User has been escalated to admin role!" : undefined
      }
    });
  }
};

module.exports = csrfController;
