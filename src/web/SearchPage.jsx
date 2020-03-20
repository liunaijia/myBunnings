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
  const [isSearching, setInSearching] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (query) {
      (async () => {
        setInSearching(true);
        const result = await findProducts(query, { sort });
        setSearchResult(result);
        setInSearching(false);
      })();
    }
  }, [query, sort]);

  function handleSubmit(event) {
    history.push(`/search?${toQueryString(event.target.value)}`);
  }

  return (
    <>
      <SearchHeader onSubmit={handleSubmit} query={query} sort={sort} />
      {isSearching && (
        <Progress hasStripe isAnimated value={100} mt="-12px" />
      )}
      <Stack spacing={4}>
        {searchResult && (
        <ProductList items={searchResult.matchedProducts.products} />
        )}
      </Stack>
    </>
  );
}


export default SearchPage;
