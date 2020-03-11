import React from 'react';
import propTypes from 'prop-types';
import { Select } from './style';

const SelectField = (props) => {
  const {
    error, options, onChange, defaultText,
  } = props;
  return (
    <>
      <Select onChange={onChange} error={error}>
        <option>{defaultText}</option>
        {
          options && options.map(({ value, label }) => <option key={label} value={value}>{label}</option>)
        }
      </Select>
    </>
  );
};

SelectField.propTypes = {
  defaultText: propTypes.string,
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  options: propTypes.arrayOf(propTypes.shape({
    label: propTypes.string,
    value: propTypes.string,
  })),
};
SelectField.defaultProps = {
  defaultText: 'select',
  error: '',
  options: [],
};

export default SelectField;
