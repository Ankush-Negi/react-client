import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { MathDemo } from '../../components/Math';

export default class CalculatorDemo extends Component {
  children = (objectOfKeys) => {
    const {
      first, second, operator, result,
    } = objectOfKeys;
    switch (operator) {
    case '+':
      return (
        <p>
          Sum of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          is equal to
          {' '}
          {result}
          {' '}
        </p>
      );
    case '-':
      return (
        <p>
          Difference of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          is equal to
          {' '}
          {result}
          {' '}
        </p>
      );
    case '/':
      return (
        <p>
          Division of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          is equal to
          {' '}
          {result}
          {' '}
        </p>
      );
    case '*':
      return (
        <p>
          Multiplication of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          is equal to
          {' '}
          {result}
          {' '}
        </p>
      );
    default:
      return (
        <p>
          Result of
          {' '}
          {first}
          {' '}
          and
          {' '}
          {second}
          {' '}
          not Calculated
        </p>
      );
    }
  }

  render() {
    return (
      <>
        <MathDemo first={7} second={4} operator="+">{this.children}</MathDemo>
        <MathDemo first={7} second={3} operator="-">{this.children}</MathDemo>
        <MathDemo first={28} second={0} operator="/">{this.children}</MathDemo>
        <MathDemo first={7} second={4} operator="*">{this.children}</MathDemo>
        <Typography>
          <MathDemo first={7} second={3} operator="+">{this.children}</MathDemo>
        </Typography>
      </>
    );
  }
}
