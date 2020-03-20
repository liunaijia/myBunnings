import React, { useState, useEffect } from 'react';
import {
  string, arrayOf, shape, number,
} from 'prop-types';
import {
  Flex, StatArrow, Box, Stack, Image, Text,
} from '@chakra-ui/core';
import PriceChart from './PriceChart';

function ProductList({ items }) {
  const [priceHistory, setPriceHistory] = useState({});
  const [selectedItemId, setSelectedItemId] = useState();

  function handleItemClick(itemId) {
    return function handler() {
      setSelectedItemId(itemId);
    };
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://pricehipster.com/api/search/products/byId?id=${selectedItemId}&includeVariants=true`);
      const data = await response.json();
      setPriceHistory({ ...priceHistory, [selectedItemId]: data.product });
    })();
  }, [selectedItemId]);

  return (
    <Stack spacing={0}>
      {items.map(item => (
        <Box borderTopWidth="10px" key={item.id}>
          <Flex onClick={handleItemClick(item.id)}>
            <Image src={item.image} alt={item.name} size="32" m={1} />
            <Flex direction="column" justify="space-between" mt={4} mb={4}>
              <Text lineHeight="shorter">{item.name}</Text>
              <Flex>
                <Text color="red.500">
                  {`$${item.price}`}
                </Text>
                {item.priceDiff < 0
                && (
                <Box as="span" ml={1}>
                  {`was $${item.normalPrice}`}
                  <StatArrow type="decrease" />
                  {`${Math.round(item.priceDiff * -100 / item.normalPrice)}%`}
                </Box>
                )}
              </Flex>
            </Flex>
          </Flex>
          {priceHistory[item.id] && (
            <PriceChart priceHistory={priceHistory[item.id].priceHistory} price={priceHistory[item.id].price} />
          )}
        </Box>
      ))}
    </Stack>
  );
}

ProductList.propTypes = {
  items: arrayOf(shape({
    id: string,
    image: string,
    name: string,
    price: number,
    priceDiff: number,
    normalPrice: number,
  })),
};

ProductList.defaultProps = {
  items: [],
};

export default ProductList;
