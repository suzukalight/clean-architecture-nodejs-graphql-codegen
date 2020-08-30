import * as React from 'react';
import { Checkbox, PrimaryButton, Slider, TextField, Toggle } from '@fluentui/react';

const Index = () => (
  <div>
    <PrimaryButton>Hello, world</PrimaryButton>
    <Toggle defaultChecked label="Hello" />
    <TextField defaultValue="hello" />
    <Checkbox defaultChecked label="Hello" />
    <Slider defaultValue={50} max={100} />
  </div>
);

export default Index;
