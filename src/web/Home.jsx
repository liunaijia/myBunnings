import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex } from '@chakra-ui/core';
import SearchForm from './SearchForm';

function Home() {
  const history = useHistory();

  async function handleSearchSubmit(event) {
    history.push(`/search?barcode=${event.target.value}`);
  }

  return (
    <Flex align="center" justify="center" h="100vh">
      <SearchForm onSubmit={handleSearchSubmit} />
    </Flex>
  );
}

export default Home;
