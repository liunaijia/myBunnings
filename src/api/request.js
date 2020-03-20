import { request } from 'https';

async function get(url, parser) {
  console.log(`[GET] ${url}`);
  return new Promise((resolve, reject) => {
    const req = request(url, {
      method: 'GET',
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
      },
    }, (response) => {
      const chunks = [];
      response
        .on('data', (chunk) => { chunks.push(chunk); })
        .on('end', () => {
          resolve(parser(chunks.join('')));
        })
        .on('error', reject);
    })
      .on('error', reject);
    req.setTimeout(15 * 1000);
    req.end();
  });
}

export { get };
