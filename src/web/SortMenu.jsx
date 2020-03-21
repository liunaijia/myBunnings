import React from 'react';
import {
  Menu, MenuButton, MenuItem, MenuList, Button,
} from '@chakra-ui/core';
import { string, func } from 'prop-types';

const sorts = {
  '': 'Best match',
  price: 'Price low to high',
  '-price': 'Price high to low',
  priceDiff: 'Discount',
  priceDiffPercentage: 'Discount%',
};

function SortMenu({ value, onChange }) {
  function handleMenuItemClick(sort) {
    return function handler() {
      if (onChange && sort !== value) {
        onChange({ target: { value: sort } });
      }
    };
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon="chevron-down">
        {sorts[value || '']}
      </MenuButton>
      <MenuList>
        {Object.entries(sorts).map(([sort, name]) => (
          <MenuItem key={sort} onClick={handleMenuItemClick(sort)}>
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

SortMenu.propTypes = {
  value: string,
  onChange: func,
};

SortMenu.defaultProps = {
  value: '',
  onChange: undefined,
};

export default SortMenu;
