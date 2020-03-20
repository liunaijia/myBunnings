import React, { useState } from 'react';
import { func } from 'prop-types';
import {
  Button, Input, Stack, InputGroup, InputLeftAddon, Box,
} from '@chakra-ui/core';
import { useForm, Form } from './components';

function SearchForm({ onSubmit }) {
  const [inputType, setInputType] = useState('barcode');
  const [formValue, handleFormChange] = useForm();

  function handleSubmit() {
    if (onSubmit) {
      onSubmit({ target: { value: formValue.q } });
    }
  }

  function handleInputTypeChange() {
    setInputType(inputType === 'barcode' ? 'text' : 'barcode');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftAddon onClick={handleInputTypeChange}>
            <Box className="material-icons">{inputType === 'barcode' ? 'texture' : 'text_fields'}</Box>
          </InputLeftAddon>
          <Form value={formValue} onChange={handleFormChange}>
            <Input name="q" placeholder={inputType === 'barcode' ? 'Barcode' : 'Anything'} pattern={inputType === 'barcode' ? '\\d*' : '*'} size="lg" autoFocus />
          </Form>
        </InputGroup>
        <Button type="submit" leftIcon="search" w="100%" size="lg">Search</Button>
      </Stack>
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: func,
};

SearchForm.defaultProps = {
  onSubmit: undefined,
};

export default SearchForm;
