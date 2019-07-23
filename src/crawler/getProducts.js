
import { get } from './util';

async function getProducts(categoryUrl, page = 1) {
  const $ = await get(`${categoryUrl}?page=${page}`);
  const data = $('.js-product-tile-container').toArray().map(e => $(e).data('options'));
  const products = data.reduce((memo, item) => memo.concat(item.data), []);
  const hasMorePages = data.some(item => item.settings.willHandleViewMore);
  console.log(`Count: ${products.length}`, `Has More? ${hasMorePages}`);
  if (!hasMorePages) {
    return products;
  }

  return products.concat(await getProducts(categoryUrl, page + 1));
}

export default getProducts;
