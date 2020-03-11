import React from 'react';
import propTypes from 'prop-types';
import { Value, Error } from './style';

const TextField = (props) => {
  const { value, error, onChange } = props;
  return (
    <>
      <Value type="text" value={value} onChange={onChange} />
      {error ? <Error>{error}</Error> : <br />}
    </>
  );
};

TextField.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
};
TextField.defaultProps = {
  error: '',
};

export default TextField;
