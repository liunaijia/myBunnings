import React, { useState } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
// import SearchBox from './SearchBox';
import Scanner from './Scanner';

function Home({ className }) {
  const history = useHistory();
  const [error, setError] = useState();

  async function handleSearchSubmit(event) {
    history.push(`/products?barcode=${event.target.value}`);
  }

  function handleError(error) {
    setError(error);
  }

  if (error) {
    return (
      error.toString()
    );
  }

  return (
    <>
      <Scanner onScanned={handleSearchSubmit} onError={handleError} />
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
