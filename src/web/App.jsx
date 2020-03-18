import React, { useState } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import {
  ErrorBoundary,
} from './components';
import GlobalStyle from './App.css';
import SearchBox from './SearchBox';
import ProductName from './ProductName';
import ProductList from './ProductList';

function App({ className }) {
  const [searchResult, setSearchResult] = useState();

  async function handleSearchSubmit(event) {
    const response = await fetch(`http://localhost:3000/price?q=${event.target.value.barcode}`);
    const data = await response.json();
    setSearchResult(data);
  }

  console.log(searchResult);

  return (
    <>
      <GlobalStyle />
      <main className={className}>
        <SearchBox onSubmit={handleSearchSubmit} />
        {searchResult && <ProductName value={searchResult.matchedProductName} />}
        {searchResult && <ProductList items={searchResult.matchedProducts.products} />}
      </main>
    </>
  );
}

App.propTypes = {
  className: string,
};

App.defaultProps = {
  className: null,
};

export default styled(App)`
  // display: flex;
  // min-height: 100vh;

  // article {
  //   flex: 1;
  // }

  // aside {
  //   width: auto;
  //   background: #1e1e1d;
  // }
`;
