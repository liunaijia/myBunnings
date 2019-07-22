import { request } from "https";

async function get(url) {
  return new Promise((resolve, reject) => {
    const req = request(url, {
      method: 'GET',
    }, (response) => {
      resolve(response);
    })
      .on('error', reject);
    req.setTimeout(15 * 1000);
    req.end();
  });
}

async function getCategories() {
  const url = 'https://www.bunnings.com.au/our-range';
  const response = await get(url)
  console.log(response);
  return response;
}

export default getCategories;
