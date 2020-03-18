import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import {
  ErrorBoundary,
} from './components';
import GlobalStyle from './App.css';

const App = ({ className }) => (
  <ErrorBoundary>
    <GlobalStyle />
    <main className={className} />
  </ErrorBoundary>
);

App.propTypes = {
  className: string,
};

App.defaultProps = {
  className: null,
};

export default styled(App)`
  display: flex;
  min-height: 100vh;

  // article {
  //   flex: 1;
  // }

  // aside {
  //   width: auto;
  //   background: #1e1e1d;
  // }
`;
