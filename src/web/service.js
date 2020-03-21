import { toQueryString } from '../../util';

export async function findProducts(q, { sort, start, length }) {
  const params = {
    q, sort, start, length,
  };
  const apiEndpoint = 'https://lugc11fh1k.execute-api.ap-southeast-2.amazonaws.com/prod';
  // const apiEndpoint = 'http://localhost:3000';
  const response = await fetch(`${apiEndpoint}/products?${toQueryString(params)}`);
  return response.json();
}
