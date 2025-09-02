// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Import 'open' correctly for CommonJS
const { default: open } = require('open');

// Create the server
const server = http.createServer((req, res) => {
  // Resolve file path (default: index.html)
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Get file extension
  const ext = path.extname(filePath);

  // Default content type
  let contentType = 'text/html';

  // Match extension to content type
  switch (ext) {
  case '.css':
    contentType = 'text/css';
    break;
  case '.js':
    contentType = 'text/javascript';
    break;
  case '.png':
    contentType = 'image/png';
    break;
  case '.jpg':
  case '.jpeg':
    contentType = 'image/jpeg';
    break;
  case '.webp': // ✅ Added WebP support
    contentType = 'image/webp';
    break;
  case '.svg':
    contentType = 'image/svg+xml';
    break;
  case '.mp4': // ✅ MP4 support
    contentType = 'video/mp4';
    break;
  case '.pdf': // ✅ PDF support
    contentType = 'application/pdf';
    break;
}


  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Port and URL
const PORT = 3000;
const url = `http://localhost:${PORT}`;

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at ${url}`);
  open(url).catch(err => console.error('❌ Failed to open browser:', err));
});
