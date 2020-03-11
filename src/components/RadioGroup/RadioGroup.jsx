import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Input } from './style';

export default function RadioGroup(props) {
  const { error, options, onChange } = props;

  return (
    <>
      {
        options && options.map(({ label, value }) => {
          return (
            <Fragment key={label}>
              <Input type="radio" onChange={onChange} name="sport" value={value} error={error} />
              {label}
              <br />
            </Fragment>
          );
        })
      }
    </>
  );
}

RadioGroup.propTypes = {
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
  options: propTypes.arrayOf(propTypes.object),
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};
