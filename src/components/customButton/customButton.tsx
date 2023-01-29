import { Button, Form } from 'antd';
import React from 'react';
import './customButton.scss';
const CustomButton = ({ text, ...otherProps }) => {
  return (
    <Button type='primary' {...otherProps}>
      {text}
    </Button>
  );
};

export default CustomButton;
