import React from 'react';
import { string } from 'prop-types';

function ProductName({ value, className }) {
  return (
    <h5 className={className}>{value}</h5>
  );
}

ProductName.propTypes = {
  value: string,
  className: string,
};

ProductName.defaultProps = {
  value: undefined,
  className: undefined,
};

export default ProductName;
