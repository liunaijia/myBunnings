import React, { useState } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
// import SearchBox from './SearchBox';
import Scanner from './Scanner';

function Home({ className }) {
  const history = useHistory();

  async function handleSearchSubmit(event) {
    history.push(`/products?barcode=${event.target.value}`);
  }

  return (
    <>
      <Scanner onScanned={handleSearchSubmit} />
      {/* <SearchBox onSubmit={handleSearchSubmit} /> */}

    </>
  );
}

Home.propTypes = {
  className: string,
};

Home.defaultProps = {
  className: null,
};

export default styled(Home)`
`;
