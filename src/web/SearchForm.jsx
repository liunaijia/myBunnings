import React from 'react';
import { func } from 'prop-types';
import { Button, Input, Stack } from '@chakra-ui/core';
import { useForm, Form } from './components';

function SearchForm({ onSubmit }) {
  const [formValue, handleFormChange] = useForm();

  function handleSubmit() {
    if (onSubmit) {
      onSubmit({ target: { value: formValue.q } });
    }
  }

  return (
    <Stack spacing={4}>
      <Form value={formValue} onChange={handleFormChange}>
        <Input type="number" name="q" placeholder="Barcode" pattern="\d*" size="lg" autoFocus />
      </Form>
      <Button leftIcon="search" onClick={handleSubmit} w="100%" size="lg">Search</Button>
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
