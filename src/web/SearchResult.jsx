import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Progress, Flex, Stack, Icon, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/core';
import ProductList from './ProductList';
import { findProducts } from './service';

function SearchResult() {
  const [searchResult, setSearchResult] = useState();

  const history = useHistory();

  const query = new URLSearchParams(useLocation().search);
  const q = query.get('q');
  const sort = query.get('sort');

  const [keyword, setKeyword] = useState(q);

  useEffect(() => {
    if (q) {
      (async () => {
        const result = await findProducts(q, { sort });
        setSearchResult(result);
      })();
    }
  }, [q, sort]);

  function handleQueryChange(event) {
    setKeyword(event.target.value);
  }

  function handleSubmit() {
    history.push(`/search?q=${keyword}`);
  }

  if (searchResult) {
    return (
      <>
        <Flex position="sticky" top={0} bg="#4154b3" p={4} as="form" onSubmit={handleSubmit}>
          <InputGroup color="white" flex="auto">
            <InputLeftElement><Icon name="search" /></InputLeftElement>
            <Input name="q" bg="#5465bb" borderWidth={0} size="lg" value={keyword} onChange={handleQueryChange} />
          </InputGroup>
        </Flex>
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
