import cheerio from 'cheerio';
import { respond } from './httpHelper';
import { get } from './request';
import { toQueryString } from '../../util';

function parseSortExpression(sort) {
  if (!sort) {
    return {};
  }

  const parts = sort.split('-');
  const sortDirection = parts.length > 1 ? 'desc' : 'asc';
  const sortField = parts[parts.length - 1];
  return { sortDirection, sortField };
}

async function findByProductName(name, { sort, start, length }) {
  const params = {
    name,
    storeIds: 'HJ1Ki6pa',
    n: length || 24,
    skip: start || 0,
    ...parseSortExpression(sort),
  };
  const url = `https://pricehipster.com/api/search/products/search?${toQueryString(params)}`;
  return get(url, JSON.parse);
}

async function searchByBarcode(q) {
  const $ = await get(`https://www.google.com/search?q=${q}`, cheerio.load);
  return $('.navigation div[data-hveid]').text();
}


export default respond(async (event) => {
  const {
    q, ...otherQueryParameters
  } = event.queryStringParameters;

  let matchedProductName;
  if (/^\d+$/.test(q)) {
    matchedProductName = await searchByBarcode(q);
  }
  if (!matchedProductName) {
    matchedProductName = q;
  }
  const matchedProducts = await findByProductName(matchedProductName, otherQueryParameters);
  return {
    body: {
      query: event.queryStringParameters,
      matchedProductName,
      matchedProducts,
    },
  };
});
