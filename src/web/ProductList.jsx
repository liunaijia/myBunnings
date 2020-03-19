import React from 'react';
import {
  string, arrayOf, shape, number,
} from 'prop-types';
import { Link } from 'react-router-dom';
import { Flex, Box } from './components';

function ProductList({ items, className }) {
  function handleItemClick(item) {
    return async function handler() {
      const response = await fetch(`https://pricehipster.com/api/search/products/byId?id=${item.id}&includeVariants=true`);
      const data = await response.json();
      console.log(data);
      // https://pricehipster.com/api/search/products/byId?id=QojADQNK8ZF9V8S_77RDBQ~HJ1Ki6pa~au&includeVariants=true
    };
  }
  return (
    <Flex className={className} direction="column">
      {items.map(item => (
        <Flex key={item.id} onClick={handleItemClick(item)}>
          <img src={item.image} alt={item.name} flex="auto" />
          <Flex>
            <Link dangerouslySetInnerHTML={{ __html: item.name_highlighted }} to={`/products/${item.id}`} />
            <div>
              {item.price}
              {' '}
              {item.priceDiff > 0 ? item.priceDiff : ''}
            </div>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

ProductList.propTypes = {
  items: arrayOf(shape({
    name_highlighted: string, id: string, image: string, name: string, price: number, priceDiff: number,
  })),
  className: string,
};

ProductList.defaultProps = {
  items: [],
  className: undefined,
};

export default ProductList;
