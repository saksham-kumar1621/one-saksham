const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const url = 'https://in.pinterest.com/OneSaksham1621/_created/';
  const html = await fetch(url);
  fs.writeFileSync('temp_created.html', html);
  console.log('Saved temp_created.html, size:', html.length);

  const pwsMatch = html.match(/<script id="__PWS_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (pwsMatch) {
    try {
      const data = JSON.parse(pwsMatch[1]);
      console.log('PWS data top keys:', Object.keys(data));
      const redux = data.props && data.props.initialReduxState;
      if (redux) {
        console.log('Redux keys:', Object.keys(redux));
        if (redux.pins) {
          console.log('Pins in redux:', Object.keys(redux.pins));
          for (const [id, pin] of Object.entries(redux.pins)) {
            console.log('PIN:', id, 'title:', pin.title, 'grid_title:', pin.grid_title, 'created_at:', pin.created_at);
            console.log('Image:', pin.images && (pin.images['736x'] || pin.images.orig));
            console.log('Board:', pin.board && pin.board.name);
            console.log('Is created?:', pin.is_native, pin.type, pin.link);
          }
        }
        if (redux.resources) {
          console.log('Resource keys:', Object.keys(redux.resources));
          for (const key of Object.keys(redux.resources)) {
            if (key.toLowerCase().includes('pin') || key.toLowerCase().includes('user')) {
              console.log('Matching resource key:', key);
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}

run();
