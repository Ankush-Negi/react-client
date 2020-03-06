import React from 'react';
import { TextField } from '../../components';
import { Text } from '../../components/TextField/style';

const TextFieldDemo = () => (
  <>
    <Text>This is a Disabled Input</Text>
    <TextField value="Disabled Input" disabled="true" />
    <Text>A Valid Input</Text>
    <TextField value="Accessible" />
    <Text>An Input with errors</Text>
    <TextField value="101" error="Could not be greater than" />
  </>
);

export default TextFieldDemo;
