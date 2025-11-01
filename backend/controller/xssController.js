let storedComments = [];

const verifyXssPayload = (req, res) => {
  try {
    const { payload, levelIndex, task } = req.body || {};
    
    if (typeof payload !== 'string' || typeof levelIndex !== 'number' || typeof task !== 'string') {
      return res.status(400).json({ error: 'Invalid payload, levelIndex or task' });
    }
    if (!payload || payload.length > 5000) {
      return res.status(400).json({ error: 'Payload too long or empty (max 5000 chars)' });
    }

    const p = payload.toLowerCase();
    const lvl = levelIndex;

    let success = false;

    if (task === 'dom') {
      if (lvl === 0) {
        // Level 0: Must use <img> or <svg> with event handlers
        success = /(<img[^>]+(onerror|onload)|<svg[^>]+(onload|onerror))/.test(p);
      } else if (lvl === 1) {
        // Level 1: Must use encoded characters or iframe/srcdoc
        success = /(%3c|%3e|srcdoc=|<iframe|data:text\/html)/.test(p);
      } else if (lvl === 2) {
        // Level 2: Must exfiltrate via postMessage or location manipulation
        success = /(postmessage|parent\.|location\.href|location\s*=)/.test(p);
      }
    } else if (task === 'reflected') {
      if (lvl === 0) {
        // Level 0: Must use <script> tag
        success = /<script/.test(p);
      } else if (lvl === 1) {
        // Level 1: Must use alternative tags like <math>, <object>, <embed> or style
        success = /(<math|<object|<embed|<style|expression\(|<base\s)/.test(p);
      } else if (lvl === 2) {
        // Level 2: Must use eval, atob or document.write for obfuscation
        success = /(eval\(|atob\(|btoa\(|document\.write|document\.cookie)/.test(p);
      }
    } else if (task === 'stored') {
      if (lvl === 0) {
        // Level 0: Must use event handlers on common tags (onerror/onload/onclick)
        success = /(onerror|onload|onclick|onfocus|onmouseover)/.test(p);
      } else if (lvl === 1) {
        // Level 1: Must use autofocus, ontoggle, or details/marquee tags
        success = /(autofocus|ontoggle|<details|<marquee|<input[^>]+onfocus)/.test(p);
      } else if (lvl === 2) {
        // Level 2: Must exfiltrate via fetch, XMLHttpRequest or new Image
        success = /(fetch\(|xmlhttprequest|new\s+image|sendbeacon|document\.cookie)/.test(p);
      }
    }

    console.log(`[xss-verify] task=${task} level=${lvl} payload=${payload.substring(0, 80)} => ${success}`);

    return res.json({ success });
  } catch (err) {
    console.error('Error in /api/xss-verify:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getComments = (req, res) => {
  try {
    return res.json({ comments: storedComments });
  } catch (err) {
    console.error('Error in GET /api/comments:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const addComment = (req, res) => {
  try {
    const { comment } = req.body || {};
    if (typeof comment !== 'string' || comment.length > 5000) {
      return res.status(400).json({ error: 'Invalid comment or too long (max 5000 chars)' });
    }
    
    const newComment = {
      id: Date.now(),
      content: comment, 
      timestamp: new Date().toISOString()
    };
    
    storedComments.push(newComment);
    console.log(`[comment-added] id=${newComment.id} content=${comment.substring(0, 50)}`);
    
    return res.json({ success: true, comment: newComment });
  } catch (err) {
    console.error('Error in POST /api/comments:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const clearComments = (req, res) => {
  try {
    storedComments = [];
    console.log('[comments-cleared]');
    return res.json({ success: true, message: 'All comments cleared' });
  } catch (err) {
    console.error('Error in DELETE /api/comments:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  verifyXssPayload,
  getComments,
  addComment,
  clearComments
};
