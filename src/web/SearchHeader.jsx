import React from 'react';
import { func, string } from 'prop-types';
import {
  Flex, Icon, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/core';
import { Form, useForm } from './components';

function SearchHeader({ onSubmit, query, sort }) {
  const [formValue, handleFormChange] = useForm({ query, sort });

  function handleSubmit() {
    if (onSubmit && formValue) {
      onSubmit({ target: { value: formValue } });
    }
  }

  return (
    <Flex position="sticky" top={0} bg="#4154b3" p={4} as="form" onSubmit={handleSubmit}>
      <InputGroup color="white" flex="auto">
        <InputLeftElement><Icon name="search" /></InputLeftElement>
        <Form value={formValue} onChange={handleFormChange}>
          <Input name="query" bg="#5465bb" borderWidth={0} size="lg" pl="2.5rem" />
        </Form>
      </InputGroup>
    </Flex>
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
