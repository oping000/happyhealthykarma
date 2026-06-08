export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { query } = req.body;
    
    // Try multiple Overpass endpoints
    const endpoints = [
      'https://overpass-api.de/api/interpreter',
      'https://overpass.kumi.systems/api/interpreter',
      'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
    ];

    let data = null;
    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'HappyHealthyKarma/1.0'
          },
          body: 'data=' + encodeURIComponent(query)
        });
        
        if (response.ok) {
          data = await response.json();
          break;
        }
      } catch (err) {
        lastError = err;
        continue;
      }
    }

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: 'All endpoints failed', details: lastError?.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
