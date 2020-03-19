import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { useForm, Form, Input } from './components';

function SearchBox({ onSubmit }) {
  const [formValue, handleFormChange] = useForm();

  function handleSubmit() {
    if (onSubmit) {
      onSubmit({ target: { value: formValue.barcode } });
    }
  }

  return (
    <Form value={formValue} onChange={handleFormChange}>
      <Input name="barcode" placeholder="Bardcode" />
      <input type="submit" onClick={handleSubmit} />
    </Form>
  );
}

SearchBox.propTypes = {
  className: string,
  onSubmit: func,
};

SearchBox.defaultProps = {
  className: undefined,
  onSubmit: undefined,
};


export default styled(SearchBox)`
`;
