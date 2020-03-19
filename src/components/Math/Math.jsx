import React from 'react';
import propTypes from 'prop-types';

const MathDemo = (props) => {
  const {
    first, second, operator, children,
  } = props;
  let { result } = props;
  switch (operator) {
  case '+':
    result = first + second;
    break;
  case '-':
    result = first - second;
    break;
  case '/':
    if (second) {
      result = first / second;
    } else {
      result = 'infinity';
    }
    break;
  case '*':
    result = first * second;
    break;
  default:
    result = 'Invalid Operator';
    break;
  }
  if (children) {
    return children({
      first, second, operator, result,
    });
  }
  return (
    <>
      <p>
        {first}
        {' '}
        {operator}
        {' '}
        {second}
        {' '}
          =
        {' '}
        {result}
      </p>
    </>
  );
};

MathDemo.propTypes = {
  result: propTypes.number.isRequired,
  first: propTypes.number.isRequired,
  second: propTypes.number.isRequired,
  operator: propTypes.oneOf(['+', '-', '/', '*']).isRequired,
  children: propTypes.func,
};

MathDemo.defaultProps = {
  children: undefined,
};

export default MathDemo;
