import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Progress, Flex, Stack,
} from '@chakra-ui/core';
import ProductList from './ProductList';
import { findProducts } from './service';
import SearchHeader from './SearchHeader';
import { toQueryString } from '../../util';

function SearchPage() {
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');

  const [searchResult, setSearchResult] = useState();

  const history = useHistory();

  useEffect(() => {
    if (query) {
      (async () => {
        const result = await findProducts(query, { sort });
        setSearchResult(result);
      })();
    }
  }, [query, sort]);

  function handleSubmit(event) {
    history.push(`/search?${toQueryString(event.target.value)}`);
  }

  if (searchResult) {
    return (
      <>
        <SearchHeader onSubmit={handleSubmit} query={query} sort={sort} />
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

export default SearchPage;
