import React from 'react';
import { func } from 'prop-types';
import { Button, Input, Stack } from '@chakra-ui/core';
import { useForm, Form } from './components';

function SearchForm({ onSubmit }) {
  const [formValue, handleFormChange] = useForm();

  function handleSubmit() {
    if (onSubmit) {
      onSubmit({ target: { value: formValue.barcode } });
    }
  }

  return (
    <Stack>
      <Form value={formValue} onChange={handleFormChange}>
        <Input type="number" name="barcode" placeholder="Bardcode" align="middle" />
      </Form>
      <Button leftIcon="search" onClick={handleSubmit} w="100%">Search</Button>
    </Stack>
  );
}

SearchForm.propTypes = {
  onSubmit: func,
};

SearchForm.defaultProps = {
  onSubmit: undefined,
};

export default SearchForm;
