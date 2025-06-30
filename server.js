
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname)));

app.get('/api/plugins', (req, res) => {
  const pluginDir = path.join(__dirname, 'plugins');
  fs.readdir(pluginDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to load plugins' });
    const jsFiles = files.filter(f => f.endsWith('.js'));
    res.json(jsFiles);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 WebBotX running at http://localhost:${PORT}`);
});
