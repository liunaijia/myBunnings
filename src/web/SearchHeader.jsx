import React, { useEffect } from 'react';
import { func, string } from 'prop-types';
import {
  Icon, Input, InputGroup, InputLeftElement, Stack,
} from '@chakra-ui/core';
import { Form, useForm } from './components';
import SortMenu from './SortMenu';

function SearchHeader({ onSubmit, query, sort }) {
  const [formValue, handleFormChange] = useForm({ query, sort });

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (onSubmit) {
      onSubmit({ target: { value: formValue } });
    }
  }

  useEffect(() => {
    // submit search when sort changes
    if (sort !== formValue.sort) {
      if (onSubmit) {
        onSubmit({ target: { value: formValue } });
      }
    }
  }, [formValue.sort]);

  return (
    <Stack direction="row" position="sticky" top={0} bg="#4154b3" p={4} as="form" onSubmit={handleSubmit}>
      <InputGroup color="white" flex="auto">
        <InputLeftElement><Icon name="search" /></InputLeftElement>
        <Form value={formValue} onChange={handleFormChange}>
          <Input name="query" bg="#5465bb" borderWidth={0} size="lg" pl="2.5rem" />
        </Form>
      </InputGroup>
      <Form value={formValue} onChange={handleFormChange}>
        <SortMenu name="sort" />
      </Form>
    </Stack>
  );
}

SearchHeader.propTypes = {
  onSubmit: func,
  query: string,
  sort: string,
};

SearchHeader.defaultProps = {
  onSubmit: undefined,
  query: '',
  sort: '',
};

export default SearchHeader;
