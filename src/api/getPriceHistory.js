import cheerio from 'cheerio';
import { respond } from './httpHelper';
import { get } from './util';

export default respond(async (event) => {
  const { q } = event.queryStringParameters;
  const $ = await get(`https://www.google.com/search?q=${q}`, cheerio.load);
  const matchedProductName = $('.navigation div[data-hveid]').text();
  const matchedProducts = await get(`https://pricehipster.com/api/search/products/search?name=${matchedProductName}&storeIds=HJ1Ki6pa&n=24&skip=0`, JSON.parse);

  return {
    body: {
      barcode: q,
      matchedProductName,
      matchedProducts,
    },
  };
});
