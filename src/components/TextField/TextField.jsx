import React from 'react';
import { Value, Error } from './style';

const TextField = (values = '') => {
  const { disabled, value, error } = values;
  return (
    <>
      <Value type="text" value={value} disabled={disabled} />
      {error ? <Error>{error}</Error> : <br />}
    </>
  );
};

export default TextField;
