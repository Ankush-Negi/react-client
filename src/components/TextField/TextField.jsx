import React from 'react';
import propTypes from 'prop-types';
import { Value, Error } from './style';

const TextField = (props) => {
  const {
    value, error, onChange, onBlur,
  } = props;
  return (
    <>
      <Value type="text" value={value} onChange={onChange} onBlur={onBlur} />
      {error ? <Error>{error}</Error> : <br />}
    </>
  );
};

TextField.propTypes = {
  onBlur: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
};
TextField.defaultProps = {
  error: '',
};

export default TextField;
