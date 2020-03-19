import React, { cloneElement, Children } from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';

function Flex({ className, children }) {
  if (Children.count(children) === 1) {
    return cloneElement(children, { className });
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
}

Flex.propTypes = {
  children: node,
  className: string,
};

Flex.defaultProps = {
  children: undefined,
  className: undefined,
};

export default styled(Flex)`
  display: ${({ inline }) => `${inline ? 'inline-' : ''}flex`};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-direction: ${({ direction }) => direction};
`;
