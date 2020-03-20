import React from 'react';
import {
  string, arrayOf, shape, number,
} from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Flex, StatArrow, Box, Stack, Image, Text,
} from '@chakra-ui/core';

function ProductList({ items }) {
  return (
    <Stack spacing={0}>
      {items.map(item => (
        <Box borderTopWidth="10px" key={item.id} as={Link} to={`/products/${item.id}`}>
          <Flex>
            <Image src={item.image} alt={item.name} size="32" m={1} />
            <Flex direction="column" justify="space-between" mt={4} mb={4}>
              <Text dangerouslySetInnerHTML={{ __html: item.name_highlighted }} lineHeight="shorter" />
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
        </Box>
      ))}
    </Stack>
  );
}

ProductList.propTypes = {
  items: arrayOf(shape({
    name_highlighted: string, id: string, image: string, name: string, price: number, priceDiff: number,
  })),
};

ProductList.defaultProps = {
  items: [],
};

export default ProductList;
