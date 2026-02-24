// Vercel serverless function: append a review to JSONBin (key stays server-side).
// Env vars: JSONBIN_SUBMITTED_BIN_ID, JSONBIN_MASTER_KEY
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const binId = process.env.JSONBIN_SUBMITTED_BIN_ID;
  const key = process.env.JSONBIN_MASTER_KEY;
  if (!binId || !key) return res.status(500).json({ error: 'Server config missing' });

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  const { name, rating, text, source } = body || {};
  if (!text || typeof text !== 'string' || text.trim().length < 20) {
    return res.status(400).json({ error: 'Review text required (min 20 chars)' });
  }
  const ratingNum = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));
  const review = {
    name: (name && typeof name === 'string' ? name.trim() : '') || 'Member',
    rating: ratingNum,
    text: text.trim(),
    source: (source && typeof source === 'string' ? source.trim() : '') || 'Website',
    date: new Date().toISOString()
  };

  try {
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { 'X-Master-Key': key }
    });
    if (!getRes.ok) throw new Error('Failed to fetch bin');
    const getData = await getRes.json();
    const record = getData.record || { reviews: [] };
    if (!Array.isArray(record.reviews)) record.reviews = [];
    record.reviews.unshift(review);

    const putRes = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': key },
      body: JSON.stringify(record)
    });
    if (!putRes.ok) throw new Error('Failed to update bin');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not save review' });
  }
};
