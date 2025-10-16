const vulnerableLogin = (req, res) => {
  const { username = "", password = "" } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  const sqlInjectionPatterns = [
    /'\s*OR\s*'1'\s*=\s*'1/i,
    /'\s*OR\s*1\s*=\s*1/i,
    /--/,
    /#/,
    /'\s*OR\s*'.*'\s*=\s*'/i,
  ];

  const isInjection = sqlInjectionPatterns.some(
    (pattern) => pattern.test(username) || pattern.test(password)
  );

  const success = isInjection;

  if (success) {
    return res.json({
      query,
      success: true,
      isInjection: true,
      type: "success",
      message: "Success! You bypassed authentication using SQL Injection!",
      explanation:
        "Your input modified the SQL query logic, making it always return true. Well done!",
    });
  } else {
    return res.json({
      query,
      success: false,
      isInjection: false,
      type: "error",
      message: "Login failed. The credentials are incorrect.",
      explanation:
        "Try injecting SQL code that makes the WHERE clause always true. Or help yourself with hints!",
    });
  }
};

const filteredLogin = (req, res) => {
  const { username = "", password = "" } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  const blockedPatterns = [
    { pattern: /\bOR\b/i, name: "OR" },
    { pattern: /\bAND\b/i, name: "AND" },
    { pattern: /--/, name: "--" },
    { pattern: /#/, name: "#" },
    { pattern: /\/\*/, name: "/*" },
    { pattern: /\*\//, name: "*/" },
    { pattern: /\bUNION\b/i, name: "UNION" },
    { pattern: /\bSELECT\b/i, name: "SELECT" },
  ];

  const checkWAF = (input) => {
    const blocked = [];
    for (let filter of blockedPatterns) {
      if (filter.pattern.test(input)) {
        blocked.push(filter.name);
      }
    }
    return blocked;
  };

  const userBlocked = checkWAF(username);
  const passBlocked = checkWAF(password);
  const allBlocked = [...userBlocked, ...passBlocked];

  if (allBlocked.length > 0) {
    return res.json({
      query,
      success: false,
      blocked: true,
      blockedWords: allBlocked,
      type: "blocked",
      message: "WAF BLOCKED: Malicious Pattern Detected!",
      explanation: `The Web Application Firewall detected and blocked: ${allBlocked.join(
        ", "
      )}. Try bypassing these filters using alternative SQL syntax!`,
    });
  }

  const bypassPatterns = [
    /'\s*\|\|\s*'1'\s*=\s*'1/i,
    /'\s*\|\|\s*1\s*=\s*1/i,
    /'\s*&&\s*'1'\s*=\s*'1/i,
    /'\s*&&\s*1\s*=\s*1/i,
    /;%00/,
    /'\s*\|\|\s*'[^']*'\s*=\s*'/i,
    /'\s*\|\|/i,
    /%27.*%7C%7C/i,
  ];

  const isBypass = bypassPatterns.some(
    (pattern) => pattern.test(username) || pattern.test(password)
  );

  if (isBypass) {
    return res.json({
      query,
      success: true,
      blocked: false,
      isBypass: true,
      type: "success",
      message: "Success! You bypassed the WAF and exploited SQL Injection!",
      explanation:
        "Excellent work! You used alternative SQL operators to bypass the input filters. This shows why blacklist-based filtering is not enough!",
    });
  } else {
    return res.json({
      query,
      success: false,
      blocked: false,
      type: "error",
      message: "Login failed. The credentials are incorrect.",
      explanation:
        "Your input passed the WAF but didn't exploit the vulnerability. Try using || instead of OR, or && instead of AND!",
    });
  }
};

const blindLogin = (req, res) => {
  const { username = "", password = "" } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  const ACTUAL_PASSWORD = "s3cr3t";
  const validUsers = { admin: ACTUAL_PASSWORD, user: "pass123" };

  let loginSuccess = false;

  if (validUsers[username] === password) {
    loginSuccess = true;
  }

  const substringPattern =
    /admin'\s*AND\s*SUBSTRING\s*\(\s*password\s*,\s*(\d+)\s*,\s*1\s*\)\s*=\s*'([^']+)'/i;
  const match = username.match(substringPattern);

  if (match) {
    const position = parseInt(match[1]);
    const guessedChar = match[2];
    const actualChar = ACTUAL_PASSWORD[position - 1];

    if (actualChar && guessedChar === actualChar) {
      loginSuccess = true;
    }
  }

  return res.json({
    query,
    success: loginSuccess,
    isBlind: true,
    type: loginSuccess ? "success" : "error",
    message: loginSuccess
      ? "Login Successful (Condition TRUE)"
      : "Login Failed (Condition FALSE)",
    explanation: loginSuccess
      ? "Your query condition returned TRUE. Keep extracting the next character!"
      : "Your query returned FALSE. Try a different character or check your position. Use SUBSTRING(password, position, 1) = 'char' to test each character.",
    actualPasswordLength: ACTUAL_PASSWORD.length, 
  });
};

const unionBasedLogin = (req, res) => {
  const { username = "", password = "" } = req.body;

  const query = `SELECT id, username FROM users WHERE username = '${username}' AND password = '${password}'`;

  const db = require("../database");

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.json({
        query,
        success: false,
        type: "error",
        message: "SQL Error: Column count mismatch or invalid query",
        explanation:
          "Make sure your UNION SELECT has the SAME NUMBER OF COLUMNS as the main query (2 columns: id, username)",
        sqlError: err.message,
      });
    }

    const hasFlag = rows.some((row) =>
      Object.values(row).some(
        (val) =>
          typeof val === "string" && val.includes("FLAG{SQL_M4ST3R_L3V3L_4}")
      )
    );

    const isUnion = /UNION/i.test(username);

    if (hasFlag) {
      return res.json({
        query,
        success: true,
        completed: true,
        extractedData: rows,
        type: "success",
        message: "SUCCESS! You found the FLAG!",
        explanation:
          "Congratulations! You extracted sensitive data using UNION-based SQL Injection. You discovered the secret flag stored in the secrets table!",
      });
    } else if (isUnion && rows.length > 0) {
      return res.json({
        query,
        success: true,
        extractedData: rows,
        type: "success",
        message: "Data Extracted Successfully!",
        explanation:
          "Great! Your UNION SELECT query worked and extracted data from the database. Can you find the table with the FLAG?",
      });
    } else if (rows.length > 0) {
      return res.json({
        query,
        success: true,
        extractedData: rows,
        type: "success",
        message: "Normal Login Successful",
        explanation:
          "You logged in normally, but you need to use UNION SELECT to extract the flag from other tables!",
      });
    } else {
      return res.json({
        query,
        success: false,
        type: "error",
        message: "Login/Query Failed",
        explanation:
          "Your query didn't work. Try using UNION SELECT to combine results from the main query with data from other tables. Available tables: users, secrets, admin_data",
      });
    }
  });
};

const errorBasedLogin = (req, res) => {
  const { username = '', password = '' } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  const SECRET_DATA = "API_KEY_xyz789";
  const SECRET_EMAIL = "admin@secret.com";

  let loginSuccess = false;
  let errorMessage = "";
  let dataExtracted = "";

  if (username === "admin" && password === "admin123") {
    loginSuccess = true;
  }

  const extractvaluePattern = /'\s*OR\s*extractvalue\s*\(\s*1\s*,\s*concat\s*\(\s*0x7e\s*,\s*\(([^)]+)\)\s*\)\s*\)\s*--/i;
  const extractMatch = username.match(extractvaluePattern);

  if (extractMatch) {
    const innerQuery = extractMatch[1];

    if (innerQuery.includes("secret_key") && innerQuery.includes("secrets")) {
      dataExtracted = SECRET_DATA;
      errorMessage = `XPATH syntax error: '~${SECRET_DATA}'`;
      loginSuccess = true;
      
      return res.json({
        type: "success",
        message: "SUCCESS! You extracted the secret using Error-Based SQLi!",
        query,
        errorMessage,
        dataExtracted,
        success: true,
        completed: true,
        explanation: "Excellent! You used MySQL error functions to leak sensitive data in error messages. The data appeared right in the error message!"
      });
    } else if (innerQuery.includes("email") && innerQuery.includes("admin_data")) {
      dataExtracted = SECRET_EMAIL;
      errorMessage = `XPATH syntax error: '~${SECRET_EMAIL}'`;
      loginSuccess = true;
    } else {
      errorMessage = `XPATH syntax error: '~DATA_HERE'`;
    }
  }

  const updatexmlPattern = /'\s*OR\s*updatexml\s*\(\s*1\s*,\s*concat\s*\(\s*0x7e\s*,\s*\(([^)]+)\)\s*\)\s*,\s*1\s*\)\s*--/i;
  const updateMatch = username.match(updatexmlPattern);

  if (updateMatch && !extractMatch) {
    const innerQuery = updateMatch[1];

    if (innerQuery.includes("secret_key") && innerQuery.includes("secrets")) {
      dataExtracted = SECRET_DATA;
      errorMessage = `XPath syntax error: '~${SECRET_DATA}'`;
      loginSuccess = true;
      
      return res.json({
        type: "success",
        message: "SUCCESS! You extracted the secret using Error-Based SQLi!",
        query,
        errorMessage,
        dataExtracted,
        success: true,
        completed: true,
        explanation: "Excellent! You used MySQL error functions to leak sensitive data in error messages!"
      });
    } else if (innerQuery.includes("email") && innerQuery.includes("admin_data")) {
      dataExtracted = SECRET_EMAIL;
      errorMessage = `XPath syntax error: '~${SECRET_EMAIL}'`;
      loginSuccess = true;
    }
  }

  if (loginSuccess && dataExtracted) {
    return res.json({
      type: "partial-success",
      message: "Data Extracted via Error Message!",
      query,
      errorMessage,
      dataExtracted,
      success: true,
      explanation: "Great! You got data from the error message. Can you extract the secret_key from the secrets table?"
    });
  }

  if (errorMessage) {
    return res.json({
      type: "error-shown",
      message: "Error Message Shown (But no data extracted yet)",
      query,
      errorMessage,
      success: false,
      explanation: "Your syntax triggered an error message, but it didn't extract useful data. Try embedding a SELECT query inside EXTRACTVALUE or UPDATEXML!"
    });
  }

  return res.json({
    type: "error",
    message: "Login Failed",
    query,
    success: false,
    explanation: "Try using error-based functions like EXTRACTVALUE() or UPDATEXML() to make the database show you data in error messages!"
  });
};

module.exports = { vulnerableLogin, filteredLogin, blindLogin, unionBasedLogin, errorBasedLogin };