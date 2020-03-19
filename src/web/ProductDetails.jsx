import React, { useEffect, useState } from 'react';
import {
  shape, string, number, arrayOf, any,
} from 'prop-types';
import { useParams } from 'react-router-dom';
import PriceChart from './PriceChart';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (id) {
      (async () => {
        const response = await fetch(`https://pricehipster.com/api/search/products/byId?id=${id}&includeVariants=true`);
        const data = await response.json();
        setProduct(data.product);
      })();
    }
  }, [id]);

  return (
    <>
      <h1>{product.name}</h1>
      <h5>{product.price}</h5>
      <img src={product.image} alt={product.name} />
      <PriceChart priceHistory={product.priceHistory} price={product.price} />
    </>
  );
}

ProductDetails.propTypes = {
  // product: shape({
  //   name: string,
  //   price: number,
  //   priceHistory: arrayOf(any),
  // }),
};

ProductDetails.defaultProps = {
  // product: {},
};

export default ProductDetails;
