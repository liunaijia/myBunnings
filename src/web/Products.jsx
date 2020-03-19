import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductName from './ProductName';
import ProductList from './ProductList';

function Products() {
  const query = new URLSearchParams(useLocation().search);
  const [searchResult, setSearchResult] = useState();

  const barcode = query.get('barcode');

  useEffect(() => {
    if (barcode) {
      (async () => {
        const apiEndpoint = 'https://pzqlp06kt7.execute-api.ap-southeast-2.amazonaws.com/Prod';
        // const apiEndpoint = http://localhost:3000
        const response = await fetch(`${apiEndpoint}/products?barcode=${barcode}`);
        const data = await response.json();
        setSearchResult(data);
      })();
    }
  }, [barcode]);

  if (searchResult) {
    return (
      <>
        <ProductName value={searchResult.matchedProductName} />
        <ProductList items={searchResult.matchedProducts.products} />
      </>
    );
  }
  return (
    <h2>Searching...</h2>
  );
}

export default Products;
