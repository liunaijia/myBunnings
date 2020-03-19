import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import GlobalStyle from './App.css';
import Router from './Router';

function App({ className }) {
  return (
    <>
      <GlobalStyle />
      <main className={className}>
        <Router />
      </main>
      <footer>
        By Naijia
      </footer>
    </>
  );
}

App.propTypes = {
  className: string,
};

App.defaultProps = {
  className: null,
};

export default styled(App)`
  // display: flex;
  // min-height: 100vh;

  // article {
  //   flex: 1;
  // }

  // aside {
  //   width: auto;
  //   background: #1e1e1d;
  // }
`;
