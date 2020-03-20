import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Progress, Flex, Stack, Text,
} from '@chakra-ui/core';
import ProductList from './ProductList';

function SearchResult() {
  const [searchResult, setSearchResult] = useState();

  const query = new URLSearchParams(useLocation().search);
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
        <Text m={4}>{searchResult.matchedProductName}</Text>
        <Stack spacing={4}>
          <ProductList items={searchResult.matchedProducts.products} />
        </Stack>
      </>
    );
  }
  return (
    <Flex align="center" justify="center" h="100vh">
      <Progress hasStripe isAnimated value={100} size="lg" w="80%" />
    </Flex>
  );
}

export default SearchResult;
