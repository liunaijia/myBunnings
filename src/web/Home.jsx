import React, { useState } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import SearchBox from './SearchBox';
import ProductName from './ProductName';
import ProductList from './ProductList';
// import PriceChart from './PriceChart';

// const ppp = {
//   product: {
//     id: 'hblXHZo6W7QVqtYAwy5nLQ~HJ1Ki6pa~au', url: 'https://www.bunnings.com.au/full-boar-19-piece-metric-drill-bit-set_p0056836', category: 'tools_&_hardware', name: 'Full Boar 19 Piece Metric Drill Bit Set', price: 19.98, priceDiff: -9, priceDiffPercentage: -31.06, normalPrice: 28.98, priceHistory: [{ date: '2019-05-13T09:34:11.911Z', price: 28.98 }, { date: '2020-02-29T08:52:28.598Z', price: 19.98 }], image: 'https://media.bunnings.com.au/Product-190x190/c86ee978-bfdc-4a7d-bcbd-71e85485103b.jpg', storeId: 'HJ1Ki6pa',
//   },
// };
{ /* <PriceChart priceHistory={ppp.product.priceHistory} price={ppp.product.price} /> */ }

function Home({ className }) {
  const [searchResult, setSearchResult] = useState();

  async function handleSearchSubmit(event) {
    const response = await fetch(`http://localhost:3000/products?barcode=${event.target.value.barcode}`);
    const data = await response.json();
    setSearchResult(data);
  }

  return (
    <>
      <SearchBox onSubmit={handleSearchSubmit} />
      {searchResult && <ProductName value={searchResult.matchedProductName} />}
      {searchResult && <ProductList items={searchResult.matchedProducts.products} />}
    </>
  );
}

Home.propTypes = {
  className: string,
};

Home.defaultProps = {
  className: null,
};

export default styled(Home)`
`;
