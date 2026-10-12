import express from 'express';
import { Innertube } from 'youtubei.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const app = express();
const port = Number(process.env.PORT) || 3000;
const root = path.dirname(fileURLToPath(import.meta.url));
let innertubePromise;

app.disable('x-powered-by');
app.use(express.static(root, { extensions: ['html'] }));

app.get('/api/youtube/search', async (req, res) => {
  const query = String(req.query.q || '').trim();
  if (!query || query.length > 120) {
    return res.status(400).json({ error: 'Informe uma busca com até 120 caracteres.' });
  }

  try {
    innertubePromise ??= Innertube.create();
    const youtube = await innertubePromise;
    const results = await youtube.search(query, { type: 'video' });
    const videos = (results.videos || [])
      .filter((video) => video.id && video.title?.text)
      .slice(0, 20)
      .map((video) => ({
        id: video.id,
        title: video.title.text,
        author: video.author?.name || 'Canal do YouTube',
        duration: video.duration?.text || '',
        thumbnail: video.thumbnails?.at(-1)?.url || ''
      }));

    res.set('Cache-Control', 'public, max-age=60');
    res.json({ videos });
  } catch (error) {
    console.error('Falha na busca Innertube:', error.message);
    res.status(502).json({ error: 'Busca temporariamente indisponível. Tente novamente.' });
  }
});

app.get('*path', (req, res) => {
  res.sendFile(path.join(root, 'spotweb-v2.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`SpotWeb disponível na porta ${port}`);
});