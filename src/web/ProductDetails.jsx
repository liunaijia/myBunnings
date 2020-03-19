import React from 'react';
import {
  shape, string, number, arrayOf, any,
} from 'prop-types';
import PriceChart from './PriceChart';

function ProductDetails({ product }) {
  return (
    <>
      <h1>{product.name}</h1>
      <h5>{product.price}</h5>
      <PriceChart priceHistory={product.priceHistory} price={product.price} />
    </>
  );
}

ProductDetails.propTypes = {
  product: shape({
    name: string,
    price: number,
    priceHistory: arrayOf(any),
  }),
};

ProductDetails.defaultProps = {
  product: {},
};

export default ProductDetails;
