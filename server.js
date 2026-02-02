// Simple Express server for Railway static site deployment
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(express.static(path.join(__dirname)));

// Route all requests to index.html for SPA-like behavior
// But also handle direct file requests
app.get('*', (req, res) => {
  // If request has a file extension, try to serve it
  if (path.extname(req.path)) {
    res.sendFile(path.join(__dirname, req.path));
  } else {
    // Otherwise serve index.html
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving files from: ${__dirname}`);
});
