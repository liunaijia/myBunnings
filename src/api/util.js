import { request } from 'https';
import cheerio from 'cheerio';

async function get(path) {
  console.log(`[GET] ${path}`);
  const domain = 'https://www.bunnings.com.au';
  return new Promise((resolve, reject) => {
    const req = request(domain + path, {
      host: domain,
      method: 'GET',
    }, (response) => {
      const chunks = [];
      response
        .on('data', (chunk) => { chunks.push(chunk); })
        .on('end', () => {
          resolve(cheerio.load(chunks.join('')));
        })
        .on('error', reject);
    })
      .on('error', reject);
    req.setTimeout(15 * 1000);
    req.end();
  });
}

export { get };
